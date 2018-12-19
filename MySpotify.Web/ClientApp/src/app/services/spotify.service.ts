import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Observable, Subject } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Utilities } from "./utilities";

import { SettingsService } from './settings.service';

@Injectable()
export class SpotifyService {
  constructor(private httpClient: HttpClient,
    private settingsService: SettingsService) {
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

      var serializedParams = this.serialize(spotifyParams, "");

      window.location.href = `${settings.spotifyAccountsUrl}authorize?${serializedParams}`;
    });
  }

  serialize(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          this.serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }
}
