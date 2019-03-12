import { Component, Input } from '@angular/core';

import { SpotifyTrack } from '../../models/spotify-track.model';

@Component({
    selector: 'track',
    templateUrl: './track.component.html',
    styleUrls: ['./track.component.css']
})
export class TrackComponent {
    @Input()
    trackObj: SpotifyTrack;

    getTrackImage(): string {
        const album = this.trackObj.album.images.sort((v1, v2) => v2.width - v1.width)[0];
        if (album && album.url) {
            return album.url;
        } else {
            return "";
        }
    }

    getBackgroundImage() {
        return { 'background': `url(${this.getTrackImage()}) center/cover no-repeat` }
    }
}
