# Niederrhein Haushaltsauflösungen

Professionelle, schlanke Angular-Website für ein lokales Unternehmen für Haushaltsauflösungen, Entrümpelungen und besenreine Übergaben im Kreis Kleve.

## Tech Stack

- Angular mit Standalone Components
- Static/Prerender-first über Angular SSR/Prerender-Konfiguration
- Kein Backend und keine Datenbank in Version 1
- Vorbereitet für spätere .NET API-Anbindung
- Deployment-fähig für Cloudflare Pages

## Struktur

```text
frontend/
  public/                 Statische Assets, robots.txt, sitemap.xml
  prerender-routes.txt    Routen für Angular Prerendering
  src/app/
    core/seo/             Meta-Tags, Canonical URLs, JSON-LD LocalBusiness
    shared/               Wiederverwendbare UI-Komponenten
    pages/                Seiten und SEO-Landingpages
```

## Seiten

- `/`
- `/haushaltsaufloesungen`
- `/entruempelungen`
- `/wohnungsaufloesungen`
- `/einsatzgebiete`
- `/kontakt`
- `/impressum`
- `/datenschutz`

## SEO-Landingpages

- `/haushaltsaufloesung-geldern`
- `/entruempelung-geldern`
- `/haushaltsaufloesung-kevelaer`
- `/entruempelung-kevelaer`
- `/haushaltsaufloesung-straelen`
- `/entruempelung-straelen`

## Setup

```bash
npm install
npm run build
```

Lokale Entwicklung:

```bash
npm start
```

Prerender-Build:

```bash
npm run prerender
```

## Cloudflare Pages

Build Command:

```bash
npm run build:cloudflare
```

Output Directory:

```text
dist/cloudflare/browser
```

Node Version:

```text
20 oder neuer
```

## Spätere .NET API Integration

TODO:

- Kontaktformular von Mailto-Fallback auf `POST /api/contact` umstellen.
- Angular Service unter `frontend/src/app/core/api/` ergänzen, z. B. `ContactApiService`.
- API Base URL über Angular Environment oder Cloudflare Pages Environment Variable konfigurieren.
- Serverseitige Validierung und Spam-Schutz im .NET Backend ergänzen.
- Datenschutzerklärung aktualisieren, sobald Formulardaten serverseitig verarbeitet werden.
- Optional: Cloudflare Turnstile für Formularschutz integrieren.

Aktuelle Integrationsstelle:

```text
frontend/src/app/shared/contact-form/contact-form.component.ts
```

## Rechtliche Platzhalter

Impressum und Datenschutz enthalten bewusst Platzhalter. Vor Veröffentlichung müssen Name, Anschrift, verantwortliche Person und Datenschutzhinweise rechtlich geprüft und vervollständigt werden.
