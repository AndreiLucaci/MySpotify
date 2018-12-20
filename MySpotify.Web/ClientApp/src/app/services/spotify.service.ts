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
    //const spotifyParams = new HttpParams();
    //spotifyParams.append('limit', '50');
    //spotifyParams.append('offset', '0');
    //spotifyParams.append('time_range', duration);

	  const spotifyParams = {
		  limit: 50,
		  offset: 0,
        'time_range': SpotifyDuration[duration]
	  };

	  const querySring = this.httpUtility.serialize(spotifyParams, "");
    
    const url = `${settings.spotifyBaseUrl}${this.meUrl}${SpotifyUserTopType.Tracks}?${querySring}`;

    return this.httpClient.get(url,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        })
      });
  }
}
