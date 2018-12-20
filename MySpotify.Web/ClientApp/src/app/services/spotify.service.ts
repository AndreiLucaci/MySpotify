import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Observable, Subject } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { SettingsService } from './settings.service';
import { HttpUtilityService } from './httpUtility.service';

import { SpotifySettings } from '../models/spotify-settings.model';

import { SpotifyDuration } from '../models/spotify-duration.enum';
import { SpotifyUserTopType } from '../models/spotify-type.enum';

@Injectable()
export class SpotifyService {
  private meUrl = 'me/top/';

  constructor(private httpClient: HttpClient,
    private settingsService: SettingsService,
    private httpUtility: HttpUtilityService) {
  }

  public connectWithSpotify() {
    this.settingsService.getSpotifySettings().subscribe(settings => {
      var redirectUri = `${window.location.origin}/my-spotify`;

      var spotifyParams = {
        'client_id': settings.spotifyClientId,
        'redirect_uri': redirectUri,
        'scope': 'user-top-read',
        'response_type': 'token',
        'state': '123'
      };

      var serializedParams = this.httpUtility.serialize(spotifyParams, "");

      window.location.href = `${settings.spotifyAccountsUrl}authorize?${serializedParams}`;
    });
  }

  getUserTopTrackInformation(accessToken: string, duration: SpotifyDuration, settings: SpotifySettings): Observable<any> {
    const spotifyParams = new HttpParams();
    spotifyParams.set('limit', '50');
    spotifyParams.set('offset', '0');
    spotifyParams.set('time_range', duration);

    const url = `${settings.spotifyBaseUrl}${this.meUrl}${SpotifyUserTopType.Tracks}`;

    return this.httpClient.get(url,
      {
        params: spotifyParams,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        })
      });
  }
}
