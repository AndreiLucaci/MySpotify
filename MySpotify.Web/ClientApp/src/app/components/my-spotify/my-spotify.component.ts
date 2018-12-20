import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs';

import { HttpUtilityService } from '../../services/httpUtility.service';
import { SettingsService } from '../../services/settings.service';
import { SpotifyService } from '../../services/spotify.service';

import { SpotifySettings } from '../../models/spotify-settings.model';
import { SpotifyTrack } from '../../models/spotify-track.model';

import { SpotifyDuration } from '../../models/spotify-duration.enum';

@Component({
  selector: 'my-spotify',
  templateUrl: './my-spotify.component.html',
  styleUrls: ['./my-spotify.component.css']
})
export class MySpotifyComponent {
  isLoading = true;
  tracks = {};

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private httpUtility: HttpUtilityService, private settingsService: SettingsService, private spotifyService: SpotifyService) {
    this.activatedRoute.fragment.subscribe((hash: string) => {
      if (hash) {
        let params = this.httpUtility.parseQuery(hash);

        if (params.hasOwnProperty('access_token')) {
          this.httpUtility.removeHash();

          this.processInformation(params['access_token']);

        }
      } else {
        router.navigateByUrl("/spotify-authorize");
      }
    });
  }

  processInformation(accessToken: string) {
    this.settingsService.getSpotifySettings().subscribe(settings => {
      this.processTracks(accessToken, settings);
    });
  }

  processTracks(accessToken: string, settings: SpotifySettings) {
    for (let duration in SpotifyDuration) {
      if (!Number(duration))
        this.processTrack(accessToken, duration as SpotifyDuration, settings);
    }
  }

  processTrack(accessToken: string, duration: SpotifyDuration, settings: SpotifySettings): Subscription {
	  this.isLoading = true;
    return this.spotifyService.getUserTopTrackInformation(accessToken, duration, settings).subscribe(result => {
      if (result.items) {
        this.tracks[duration] = (result.items as SpotifyTrack[]).sort((v1, v2) => v2.popularity - v1.popularity);
      }
    }, err => console.error(err), () => {
	    this.isLoading = false;
    });
  }

  getLongTerm() {
	  return this.getTracks(SpotifyDuration.LongTerm);
  }

  getMediumTerm() {
	  return this.getTracks(SpotifyDuration.MediumTerm);
  }

  getShortTerm() {
	  return this.getTracks(SpotifyDuration.ShortTerm);
  }

  getTracks(duration: SpotifyDuration) : SpotifyTrack[] {
	  return this.tracks[duration] as SpotifyTrack[];
  }
}
