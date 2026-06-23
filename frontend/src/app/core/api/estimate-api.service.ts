import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export type FillLevel = 'low' | 'normal' | 'high' | 'extreme';
export type ParkingDistance = 'near' | 'medium' | 'far';
export type PropertyType = 'Wohnung' | 'Haus' | 'Keller' | 'Garage' | 'Gewerbe';

export interface EstimateRequest {
  propertyType: PropertyType;
  areaSqm: number;
  floor: number;
  hasElevator: boolean;
  parkingDistance: ParkingDistance;
  fillLevel: FillLevel;
  photos: File[];
}

export interface EstimateResponse {
  min: number;
  max: number;
  summary: string[];
  source: 'rule_based' | 'openai_enhanced';
  ai: {
    fillLevel?: FillLevel;
    visibleItems: string[];
    riskFactors: string[];
    confidence: number;
    notes: string;
  } | null;
}

@Injectable({ providedIn: 'root' })
export class EstimateApiService {
  private readonly http = inject(HttpClient);

  calculate(request: EstimateRequest) {
    const formData = new FormData();
    formData.set('propertyType', request.propertyType);
    formData.set('areaSqm', String(request.areaSqm));
    formData.set('floor', String(request.floor));
    formData.set('hasElevator', String(request.hasElevator));
    formData.set('parkingDistance', request.parkingDistance);
    formData.set('fillLevel', request.fillLevel);

    for (const photo of request.photos.slice(0, 3)) {
      formData.append('photos', photo, photo.name);
    }

    return this.http.post<EstimateResponse>('/api/estimate', formData);
  }
}
