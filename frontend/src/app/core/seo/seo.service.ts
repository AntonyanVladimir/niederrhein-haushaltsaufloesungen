import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SeoData } from './seo.model';

const SITE_URL = 'https://niederrhein-haushaltsaufloesungen.de';
const BUSINESS_NAME = 'Niederrhein Haushaltsauflösungen';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  bindRouteMeta(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const data = this.resolveSeoData();
        this.apply(data);
      });
  }

  private resolveSeoData(): SeoData {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.snapshot.data['seo'] as SeoData ?? {
      title: BUSINESS_NAME,
      description: 'Haushaltsauflösungen und Entrümpelungen im Kreis Kleve.',
      canonicalPath: this.router.url
    };
  }

  applySeo(data: SeoData): void {
    this.apply(data);
  }

  private apply(data: SeoData): void {
    const canonical = `${SITE_URL}${data.canonicalPath}`;
    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
    this.setCanonical(canonical);
    this.setJsonLd();
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(): void {
    const id = 'local-business-jsonld';
    const existing = this.document.getElementById(id);
    existing?.remove();

    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      url: SITE_URL,
      email: 'info@niederrhein-haushaltsaufloesungen.de',
      telephone: '+49 XXX XXXXXXX',
      areaServed: ['Geldern', 'Kevelaer', 'Straelen', 'Kerken', 'Issum', 'Wachtendonk', 'Kreis Kleve'],
      slogan: 'Zuverlässig räumen. Sauber übergeben.',
      serviceType: [
        'Haushaltsauflösung',
        'Entrümpelung',
        'Wohnungsauflösung',
        'Keller- und Garagenräumung',
        'Nachlassauflösung'
      ]
    });
    this.document.head.appendChild(script);
  }
}
