import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  city: string;
  requestType: string;
  message: string;
  privacyAccepted: boolean;
}

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private readonly http = inject(HttpClient);

  send(request: ContactRequest) {
    return this.http.post<{ message: string }>('/api/contact', request);
  }
}
