import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs';

import { HttpUtilityService } from '../../services/httpUtility.service';
import { SettingsService } from '../../services/settings.service';
import { SpotifyService } from '../../services/spotify.service';

import { SpotifySettings } from '../../models/spotify-settings.model';
import { SpotifyTrack } from '../../models/spotify-track.model';
import { SpotifyArtist } from '../../models/spotify-artist.model';

import { SideNaveSelectedItem } from '../../viewmodels/side-nav-selected-item.viewmodel';

import { SpotifyDuration } from '../../models/spotify-duration.enum';
import { SpotifyUserTopType } from '../../models/spotify-type.enum';

@Component({
    selector: 'my-spotify',
    templateUrl: './my-spotify.component.html',
    styleUrls: ['./my-spotify.component.css']
})
export class MySpotifyComponent {
    isLoading = true;
    tracks = {};
    artists = {};

    selectedArtists: SpotifyArtist[] = [];
    selectedTracks: SpotifyTrack[] = [];

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
                this.artists[SpotifyDuration[duration]] =
                    (result.items as SpotifyArtist[]);
            }
        },
            err => {
                console.error(err);
                this.isLoading = false;
            },
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
                this.tracks[SpotifyDuration[duration]] =
                    (result.items as SpotifyTrack[]);
            }
        },
            err => {
                console.error(err);
                this.isLoading = false;
            },
            () => {
                this.isLoading = false;
            });
    }

    navSelectedItem(item: SideNaveSelectedItem) {
        this.clearSelectedItems();

        if (item.type === SpotifyUserTopType.Artists) {
            this.selectedArtists = this.getArtists(item.duration);
        } else {
            this.selectedTracks = this.getTracks(item.duration);
        }
    }

    clearSelectedItems() {
        this.selectedArtists = [];
        this.selectedTracks = [];
    }

    getLongTermArtist() {
        const result = this.getArtists(SpotifyDuration.LongTerm);

        return result;
    }

    getMediumTermArtist() {
        return this.getArtists(SpotifyDuration.MediumTerm);
    }

    getShortTermArtist() {
        const result = this.getArtists(SpotifyDuration.ShortTerm);

        return result;
    }

    getArtists(duration: SpotifyDuration): SpotifyArtist[] {
        return this.artists[duration] as SpotifyArtist[];
    }

    getLongTermTrack() {
        const result = this.getTracks(SpotifyDuration.LongTerm);

        return result;
    }

    getMediumTermTrack() {
        return this.getTracks(SpotifyDuration.MediumTerm);
    }

    getShortTermTrack() {
        const result = this.getTracks(SpotifyDuration.ShortTerm);

        return result;
    }

    getTracks(duration: SpotifyDuration): SpotifyTrack[] {
        return this.tracks[duration] as SpotifyTrack[];
    }
}
