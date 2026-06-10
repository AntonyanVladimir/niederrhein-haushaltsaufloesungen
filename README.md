# Niederrhein Haushaltsauflösungen

Professionelle, schlanke Angular-Website für ein lokales Unternehmen für Haushaltsauflösungen, Entrümpelungen und besenreine Übergaben im Kreis Kleve.

## Tech Stack

- Angular mit Standalone Components
- Static/Prerender-first über Angular SSR/Prerender-Konfiguration
- Cloudflare Pages Functions für das Kontaktformular
- Keine Datenbank in Version 1
- Deployment-fähig für Cloudflare Pages inklusive `/api/contact`

## Struktur

```text
frontend/
  public/                 Statische Assets, robots.txt, sitemap.xml
  prerender-routes.txt    Routen für Angular Prerendering
  src/app/
    core/seo/             Meta-Tags, Canonical URLs, JSON-LD LocalBusiness
    core/api/             Angular API Services
    shared/               Wiederverwendbare UI-Komponenten
    pages/                Seiten und SEO-Landingpages
functions/
  api/contact.ts          Cloudflare Pages Function für Kontaktanfragen
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

Cloudflare Pages inklusive Function lokal testen:

```bash
npm run start:cloudflare
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

Environment Variables in Cloudflare Pages:

```text
RESEND_API_KEY=...
CONTACT_FROM_EMAIL=kontakt@niederrhein-haushaltsaufloesungen.de
CONTACT_TO_EMAIL=info@niederrhein-haushaltsaufloesungen.de
```

Für `CONTACT_FROM_EMAIL` muss die Domain beim Maildienst, z. B. Resend, verifiziert sein.

## Cloudflare Backend

TODO:

- Maildienst-Domain verifizieren und DNS-Einträge setzen.
- Cloudflare Environment Variables setzen.
- Serverseitigen Spam-Schutz ergänzen.
- Optional: Cloudflare Turnstile für Formularschutz integrieren.

API-Endpunkt:

```text
POST /api/contact
```

## Rechtliche Platzhalter

Impressum und Datenschutz enthalten bewusst Platzhalter. Vor Veröffentlichung müssen Name, Anschrift, verantwortliche Person und Datenschutzhinweise rechtlich geprüft und vervollständigt werden.
