import { Component, Input, OnInit } from '@angular/core';

import { SpotifyArtist } from '../../models/spotify-artist.model';
import { SpotifyUserTopType } from '../../models/spotify-type.enum';

@Component({
    selector: 'artist-page',
    templateUrl: './artist-page.component.html',
    styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
    ngOnInit() {
        let interval = setInterval(() => {
            if (this.artists !== undefined && this.artists.length > 0) {
                this.selectedArtist = this.artists[0];
                clearInterval(interval);
            }
        }, 500);
    }

    @Input()
    artists: SpotifyArtist[];

    @Input()
    type: SpotifyUserTopType;

    selectedArtist: SpotifyArtist;

    selectArtist(artist: SpotifyArtist) {
        this.selectedArtist = artist;
    }

    getArtistImage(input: SpotifyArtist): string {
        const artist = input.images.sort((v1, v2) => v2.width - v1.width)[0];
        if (artist && artist.url) {
            return artist.url;
        } else {
            return "";
        }
    }
}
