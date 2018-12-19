import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Utilities } from "./utilities";

import { SpotifySettings } from '../models/spotify-settings.model';

@Injectable()
export class SettingsService {
  private baseUrl = "/api/settings/";

  constructor(private http: HttpClient) {
  }

  getSpotifySettings(): Observable<SpotifySettings> {
    return this.http.get<SpotifySettings>(`${this.baseUrl}`);
  }
}
