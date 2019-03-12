import { Component, Input, OnInit } from '@angular/core';

import { SpotifyTrack } from '../../models/spotify-track.model';

@Component({
    selector: 'track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
    ngOnInit() {
        if (this.tracks !== undefined && this.tracks.length > 0) {
            this.selectedTrack = this.tracks[0];
        }
    }

    @Input()
    tracks: SpotifyTrack[];

    selectedTrack: SpotifyTrack;

    selectTrack(track: SpotifyTrack) {
        this.selectedTrack = track;
    }

    getTrackImage(input: SpotifyTrack): string {
        const track = input.album.images.sort((v1, v2) => v2.width - v1.width)[0];
        if (track && track.url) {
            return track.url;
        } else {
            return "";
        }
    }
}
