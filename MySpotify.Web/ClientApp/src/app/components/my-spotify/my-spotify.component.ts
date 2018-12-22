import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs';

import { HttpUtilityService } from '../../services/httpUtility.service';
import { SettingsService } from '../../services/settings.service';
import { SpotifyService } from '../../services/spotify.service';

import { SpotifySettings } from '../../models/spotify-settings.model';
import { SpotifyTrack } from '../../models/spotify-track.model';
import { SpotifyArtist } from '../../models/spotify-artist.model';

import { SpotifyDuration } from '../../models/spotify-duration.enum';

@Component({
    selector: 'my-spotify',
    templateUrl: './my-spotify.component.html',
    styleUrls: ['./my-spotify.component.css']
})
export class MySpotifyComponent {
    isLoading = true;

    shortTermArtists: SpotifyArtist[] = [];
    mediumTermArtists: SpotifyArtist[] = [];
    longTermArtists: SpotifyArtist[] = [];

    shortTermTracks: SpotifyTrack[] = [];
    mediumTermTracks: SpotifyTrack[] = [];
    longTermTracks: SpotifyTrack[] = [];

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
            this.processArtists(accessToken, settings);
            this.processTracks(accessToken, settings);
        });
    }

    processArtists(accessToken: string, settings: SpotifySettings) {
        for (let duration in SpotifyDuration) {
            if (!Number(duration)) {
                this.processArtist(accessToken, duration as SpotifyDuration, settings);
            }
        }
    }

    processArtist(accessToken: string, duration: SpotifyDuration, settings: SpotifySettings) {
        this.isLoading = true;
        return this.spotifyService.getUserTopArtistInformation(accessToken, duration, settings).subscribe(result => {
            if (result && result.items) {
                switch (SpotifyDuration[duration]) {
                    case SpotifyDuration.ShortTerm:
	                    this.shortTermArtists.push(...(result.items as SpotifyArtist[]));
                        break;
                    case SpotifyDuration.MediumTerm:
                        this.mediumTermArtists.push(...(result.items as SpotifyArtist[]));
                        break;
                    case SpotifyDuration.LongTerm:
                        this.longTermArtists.push(...(result.items as SpotifyArtist[]));
                        break;
                }
            }
        },
            err => console.error(err),
            () => {
                this.isLoading = false;
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
            if (result && result.items) {
                switch (SpotifyDuration[duration]) {
                    case SpotifyDuration.ShortTerm:
                        this.shortTermTracks.push(...(result.items as SpotifyTrack[]));
                        break;
                    case SpotifyDuration.MediumTerm:
                        this.mediumTermTracks.push(...(result.items as SpotifyTrack[]));
                        break;
                    case SpotifyDuration.LongTerm:
                        this.longTermTracks.push(...(result.items as SpotifyTrack[]));
                        break;
                }
            }
        },
            err => console.error(err),
            () => {
                this.isLoading = false;
            });
    }
}
