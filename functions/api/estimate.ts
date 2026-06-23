interface Env {
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
}

type PagesFunction<Bindings> = (context: {
  request: Request;
  env: Bindings;
}) => Response | Promise<Response>;

type FillLevel = 'low' | 'normal' | 'high' | 'extreme';
type ParkingDistance = 'near' | 'medium' | 'far';
type PropertyType = 'Wohnung' | 'Haus' | 'Keller' | 'Garage' | 'Gewerbe';

interface EstimateInput {
  propertyType: PropertyType;
  areaSqm: number;
  floor: number;
  hasElevator: boolean;
  parkingDistance: ParkingDistance;
  fillLevel: FillLevel;
}

interface AiFeatures {
  fillLevel?: FillLevel;
  visibleItems: string[];
  riskFactors: string[];
  confidence: number;
  notes: string;
}

interface EstimateResult {
  min: number;
  max: number;
  summary: string[];
  ai: AiFeatures | null;
  source: 'rule_based' | 'openai_enhanced';
}

const propertyTypes: PropertyType[] = ['Wohnung', 'Haus', 'Keller', 'Garage', 'Gewerbe'];
const fillLevels: FillLevel[] = ['low', 'normal', 'high', 'extreme'];
const parkingDistances: ParkingDistance[] = ['near', 'medium', 'far'];

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: corsHeaders() });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return json({ message: 'Ungültige Anfrage.' }, 400);
  }

  const parseResult = parseEstimateInput(formData);
  if ('error' in parseResult) {
    return json({ message: parseResult.error }, 400);
  }

  const images = formData
    .getAll('photos')
    .filter((value): value is File => value instanceof File && value.size > 0)
    .slice(0, 3);

  const imageError = validateImages(images);
  if (imageError) {
    return json({ message: imageError }, 400);
  }

  let ai: AiFeatures | null = null;
  if (env.OPENAI_API_KEY && env.OPENAI_MODEL && images.length > 0) {
    ai = await analyzeImagesWithOpenAI(env, parseResult.input, images);
  }

  const estimate = calculateEstimate(parseResult.input, ai);
  return json(estimate);
};

function parseEstimateInput(formData: FormData): { input: EstimateInput } | { error: string } {
  const propertyType = String(formData.get('propertyType') ?? '');
  const fillLevel = String(formData.get('fillLevel') ?? '');
  const parkingDistance = String(formData.get('parkingDistance') ?? '');
  const areaSqm = Number(formData.get('areaSqm'));
  const floor = Number(formData.get('floor') ?? 0);
  const hasElevator = String(formData.get('hasElevator')) === 'true';

  if (!propertyTypes.includes(propertyType as PropertyType)) {
    return { error: 'Bitte wählen Sie eine gültige Objektart.' };
  }
  if (!fillLevels.includes(fillLevel as FillLevel)) {
    return { error: 'Bitte wählen Sie einen gültigen Füllgrad.' };
  }
  if (!parkingDistances.includes(parkingDistance as ParkingDistance)) {
    return { error: 'Bitte wählen Sie einen gültigen Parkweg.' };
  }
  if (!Number.isFinite(areaSqm) || areaSqm < 5 || areaSqm > 500) {
    return { error: 'Bitte geben Sie eine realistische Fläche zwischen 5 und 500 m² an.' };
  }
  if (!Number.isFinite(floor) || floor < 0 || floor > 12) {
    return { error: 'Bitte geben Sie eine realistische Etage an.' };
  }

  return {
    input: {
      propertyType: propertyType as PropertyType,
      areaSqm,
      floor,
      hasElevator,
      parkingDistance: parkingDistance as ParkingDistance,
      fillLevel: fillLevel as FillLevel
    }
  };
}

function validateImages(images: File[]): string | null {
  if (images.length > 3) return 'Bitte laden Sie maximal 3 Fotos hoch.';

  for (const image of images) {
    if (!image.type.startsWith('image/')) {
      return 'Bitte laden Sie nur Bilddateien hoch.';
    }
    if (image.size > 3 * 1024 * 1024) {
      return 'Bitte laden Sie nur Fotos bis 3 MB hoch.';
    }
  }

  return null;
}

async function analyzeImagesWithOpenAI(env: Env, input: EstimateInput, images: File[]): Promise<AiFeatures | null> {
  const imageContent = await Promise.all(images.map(fileToImageContent));
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.OPENAI_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL,
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: [
                'Analysiere die Fotos fuer eine unverbindliche Entruempelungs-Preisschaetzung.',
                'Erfinde keinen Endpreis. Extrahiere nur Merkmale fuer ein Regelwerk.',
                `Objektart: ${input.propertyType}`,
                `Flaeche: ${input.areaSqm} m2`,
                `Etage: ${input.floor}`,
                `Aufzug: ${input.hasElevator ? 'ja' : 'nein'}`,
                `Parkweg: ${input.parkingDistance}`,
                `Vom Nutzer gewaehlter Fuellgrad: ${input.fillLevel}`
              ].join('\n')
            },
            ...imageContent
          ]
        }
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'clearance_photo_features',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              fillLevel: { type: 'string', enum: fillLevels },
              visibleItems: { type: 'array', items: { type: 'string' } },
              riskFactors: { type: 'array', items: { type: 'string' } },
              confidence: { type: 'number' },
              notes: { type: 'string' }
            },
            required: ['fillLevel', 'visibleItems', 'riskFactors', 'confidence', 'notes']
          }
        }
      }
    })
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json() as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
  const text = payload.output_text || payload.output?.flatMap((item) => item.content ?? []).find((content) => content.text)?.text;
  if (!text) return null;

  try {
    return normalizeAiFeatures(JSON.parse(text));
  } catch {
    return null;
  }
}

async function fileToImageContent(file: File): Promise<{ type: 'input_image'; image_url: string }> {
  const bytes = await file.arrayBuffer();
  const base64 = arrayBufferToBase64(bytes);
  return {
    type: 'input_image',
    image_url: `data:${file.type};base64,${base64}`
  };
}

function normalizeAiFeatures(value: Partial<AiFeatures>): AiFeatures | null {
  const fillLevel = fillLevels.includes(value.fillLevel as FillLevel) ? value.fillLevel : undefined;

  return {
    fillLevel,
    visibleItems: Array.isArray(value.visibleItems) ? value.visibleItems.slice(0, 12).map(String) : [],
    riskFactors: Array.isArray(value.riskFactors) ? value.riskFactors.slice(0, 8).map(String) : [],
    confidence: typeof value.confidence === 'number' ? Math.max(0, Math.min(1, value.confidence)) : 0,
    notes: typeof value.notes === 'string' ? value.notes.slice(0, 500) : ''
  };
}

function calculateEstimate(input: EstimateInput, ai: AiFeatures | null): EstimateResult {
  const baseByType: Record<PropertyType, number> = {
    Wohnung: 18,
    Haus: 20,
    Keller: 16,
    Garage: 14,
    Gewerbe: 22
  };
  const fillMultiplier: Record<FillLevel, number> = {
    low: .75,
    normal: 1,
    high: 1.35,
    extreme: 1.85
  };
  const minimumByType: Record<PropertyType, number> = {
    Wohnung: 450,
    Haus: 650,
    Keller: 250,
    Garage: 220,
    Gewerbe: 700
  };

  const effectiveFillLevel = ai?.fillLevel && ai.confidence >= .55 ? ai.fillLevel : input.fillLevel;
  const parkingMultiplier = input.parkingDistance === 'far' ? 1.18 : input.parkingDistance === 'medium' ? 1.08 : 1;
  const floorMultiplier = input.hasElevator ? 1 : 1 + Math.min(input.floor, 5) * .06;
  const riskMultiplier = ai?.riskFactors.length ? 1 + Math.min(ai.riskFactors.length, 4) * .04 : 1;
  const calculated = input.areaSqm * baseByType[input.propertyType] * fillMultiplier[effectiveFillLevel] * parkingMultiplier * floorMultiplier * riskMultiplier;
  const midpoint = Math.max(minimumByType[input.propertyType], calculated);
  const min = roundToFifty(midpoint * .82);
  const max = roundToFifty(midpoint * 1.22);

  const fillLabels: Record<FillLevel, string> = {
    low: 'Wenig',
    normal: 'Normal',
    high: 'Viel',
    extreme: 'Sehr voll'
  };

  return {
    min,
    max,
    ai,
    source: ai ? 'openai_enhanced' : 'rule_based',
    summary: [
      `${input.propertyType}, ca. ${input.areaSqm} m²`,
      `Füllgrad: ${fillLabels[effectiveFillLevel]}`,
      input.hasElevator ? 'Aufzug berücksichtigt' : `Etage ${input.floor} ohne Aufzug berücksichtigt`,
      ai ? 'Fotos wurden in die Orientierung einbezogen' : 'Regelbasierte Orientierung ohne Fotoanalyse'
    ]
  };
}

function roundToFifty(value: number): number {
  return Math.max(150, Math.round(value / 50) * 50);
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...corsHeaders()
    }
  });
}

function corsHeaders(): HeadersInit {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type'
  };
}
