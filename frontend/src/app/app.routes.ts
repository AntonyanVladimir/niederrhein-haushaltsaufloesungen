import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicePageComponent } from './pages/service-page/service-page.component';
import { AreasComponent } from './pages/areas/areas.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EstimateComponent } from './pages/estimate/estimate.component';
import { LegalComponent } from './pages/legal/legal.component';
import { LocationLandingComponent } from './pages/location-landing/location-landing.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      seo: {
        title: 'Niederrhein Haushaltsauflösungen | Entrümpelung im Kreis Kleve',
        description: 'Haushaltsauflösungen, Entrümpelungen und besenreine Übergaben in Geldern, Kevelaer, Straelen und Kreis Kleve.',
        canonicalPath: '/'
      }
    }
  },
  {
    path: 'haushaltsaufloesungen',
    component: ServicePageComponent,
    data: {
      service: 'Haushaltsauflösungen',
      headline: 'Haushaltsauflösungen am Niederrhein',
      intro: 'Wir übernehmen Haushaltsauflösungen planbar, diskret und mit sauberer Übergabe.',
      points: [
        'Kostenlose Vor-Ort-Besichtigung',
        'Sorgfältige Termin- und Ablaufplanung',
        'Sortierung von Hausrat, Sperrmüll und verwertbaren Gegenständen',
        'Fachgerechter Abtransport über geeignete Entsorgungsstellen',
        'Nachlass- und Haushaltsauflösungen mit diskreter Abwicklung',
        'Besenreine Übergabe nach Absprache'
      ],
      image: '/images/haushaltsaufloesung.jpg',
      imageAlt: 'Geordnete Umzugskartons in einem hellen Wohnzimmer',
      seo: {
        title: 'Haushaltsauflösungen am Niederrhein | Kreis Kleve',
        description: 'Professionelle Haushaltsauflösungen in Geldern, Kevelaer, Straelen und Umgebung mit Besichtigung und Festpreis.',
        canonicalPath: '/haushaltsaufloesungen'
      }
    }
  },
  {
    path: 'entruempelungen',
    component: ServicePageComponent,
    data: {
      service: 'Entrümpelungen',
      headline: 'Entrümpelungen für Haus, Wohnung, Keller und Garage',
      intro: 'Wir räumen einzelne Räume oder komplette Objekte effizient, sorgfältig und nachvollziehbar.',
      points: [
        'Räumung von Keller, Dachboden, Garage und Nebenräumen',
        'Entrümpelung einzelner Räume oder kompletter Objekte',
        'Sortierung nach Entsorgung, Verwertung und Wiederverwendung',
        'Abtransport inklusive fachgerechter Entsorgung',
        'Saubere Übergabe der geräumten Bereiche',
        'Klare Abläufe und transparente Kosten vor Beginn'
      ],
      image: '/images/entruempelung.jpg',
      imageAlt: 'Aufgeräumte Garage mit sortierten Gegenständen zur Entsorgung',
      seo: {
        title: 'Entrümpelungen am Niederrhein | Fachgerecht räumen lassen',
        description: 'Entrümpelungen in Geldern, Kevelaer, Straelen und Kreis Kleve. Kostenlose Besichtigung und transparente Festpreise.',
        canonicalPath: '/entruempelungen'
      }
    }
  },
  {
    path: 'wohnungsaufloesungen',
    component: ServicePageComponent,
    data: {
      service: 'Wohnungsauflösungen',
      headline: 'Wohnungsauflösungen mit besenreiner Übergabe',
      intro: 'Für Angehörige, Vermieter und Hausverwaltungen lösen wir Wohnungen termingerecht und diskret auf.',
      points: [
        'Planung nach Übergabe- oder Kündigungsfrist',
        'Räumung von Möbeln, Hausrat, Keller- und Abstellflächen',
        'Abstimmung mit Eigentümer, Vermieter oder Hausverwaltung',
        'Diskrete Abwicklung bei Nachlassfällen',
        'Fachgerechter Abtransport nicht mehr benötigter Gegenstände',
        'Saubere Übergabe an Eigentümer oder Verwaltung'
      ],
      image: '/images/wohnungsaufloesung.jpg',
      imageAlt: 'Besenrein geräumte Wohnung mit wenigen Kartons zur Übergabe',
      seo: {
        title: 'Wohnungsauflösungen im Kreis Kleve | Besenrein übergeben',
        description: 'Wohnungsauflösungen am Niederrhein für Privatkunden, Vermieter und Hausverwaltungen. Diskret, zuverlässig und sauber.',
        canonicalPath: '/wohnungsaufloesungen'
      }
    }
  },
  {
    path: 'einsatzgebiete',
    component: AreasComponent,
    data: {
      seo: {
        title: 'Einsatzgebiete | Geldern, Kevelaer, Straelen und Kreis Kleve',
        description: 'Niederrhein Haushaltsauflösungen ist regional in Geldern, Kevelaer, Straelen, Kerken, Issum, Wachtendonk und Kreis Kleve tätig.',
        canonicalPath: '/einsatzgebiete'
      }
    }
  },
  {
    path: 'schaetzung',
    component: EstimateComponent,
    data: {
      seo: {
        title: 'Preisschätzung | Entrümpelung grob einschätzen',
        description: 'Unverbindliche Preisorientierung für Entrümpelung, Haushaltsauflösung oder Wohnungsauflösung am Niederrhein.',
        canonicalPath: '/schaetzung'
      }
    }
  },
  {
    path: 'kontakt',
    component: ContactComponent,
    data: {
      seo: {
        title: 'Kontakt | Kostenlose Besichtigung anfragen',
        description: 'Kontakt zu Niederrhein Haushaltsauflösungen. Kostenlose Besichtigung für Haushaltsauflösung oder Entrümpelung anfragen.',
        canonicalPath: '/kontakt'
      }
    }
  },
  {
    path: 'impressum',
    component: LegalComponent,
    data: {
      page: 'impressum',
      seo: {
        title: 'Impressum | Niederrhein Haushaltsauflösungen',
        description: 'Impressum von Niederrhein Haushaltsauflösungen.',
        canonicalPath: '/impressum'
      }
    }
  },
  {
    path: 'datenschutz',
    component: LegalComponent,
    data: {
      page: 'datenschutz',
      seo: {
        title: 'Datenschutz | Niederrhein Haushaltsauflösungen',
        description: 'Datenschutzhinweise von Niederrhein Haushaltsauflösungen.',
        canonicalPath: '/datenschutz'
      }
    }
  },
  {
    path: 'haushaltsaufloesung-geldern',
    component: LocationLandingComponent,
    data: {
      seo: {
        title: 'Haushaltsauflösung Geldern | Niederrhein Haushaltsauflösungen',
        description: 'Haushaltsauflösung in Geldern mit kostenloser Besichtigung, transparentem Festpreis und besenreiner Übergabe.',
        canonicalPath: '/haushaltsaufloesung-geldern'
      }
    }
  },
  {
    path: 'entruempelung-geldern',
    component: LocationLandingComponent,
    data: {
      seo: {
        title: 'Entrümpelung Geldern | Niederrhein Haushaltsauflösungen',
        description: 'Entrümpelung in Geldern für Wohnung, Haus, Keller und Garage. Fachgerecht, diskret und regional.',
        canonicalPath: '/entruempelung-geldern'
      }
    }
  },
  {
    path: 'haushaltsaufloesung-kevelaer',
    component: LocationLandingComponent,
    data: {
      seo: {
        title: 'Haushaltsauflösung Kevelaer | Niederrhein Haushaltsauflösungen',
        description: 'Haushaltsauflösung in Kevelaer mit kostenloser Besichtigung, Festpreis und sauberer Übergabe.',
        canonicalPath: '/haushaltsaufloesung-kevelaer'
      }
    }
  },
  {
    path: 'entruempelung-kevelaer',
    component: LocationLandingComponent,
    data: {
      seo: {
        title: 'Entrümpelung Kevelaer | Niederrhein Haushaltsauflösungen',
        description: 'Entrümpelung in Kevelaer und Umgebung. Transparent geplant, fachgerecht geräumt, besenrein übergeben.',
        canonicalPath: '/entruempelung-kevelaer'
      }
    }
  },
  {
    path: 'haushaltsaufloesung-straelen',
    component: LocationLandingComponent,
    data: {
      seo: {
        title: 'Haushaltsauflösung Straelen | Niederrhein Haushaltsauflösungen',
        description: 'Haushaltsauflösung in Straelen mit diskreter Abwicklung, fachgerechter Entsorgung und Festpreis.',
        canonicalPath: '/haushaltsaufloesung-straelen'
      }
    }
  },
  {
    path: 'entruempelung-straelen',
    component: LocationLandingComponent,
    data: {
      seo: {
        title: 'Entrümpelung Straelen | Niederrhein Haushaltsauflösungen',
        description: 'Entrümpelung in Straelen für Wohnungen, Häuser, Keller und Garagen. Regional im Kreis Kleve.',
        canonicalPath: '/entruempelung-straelen'
      }
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
