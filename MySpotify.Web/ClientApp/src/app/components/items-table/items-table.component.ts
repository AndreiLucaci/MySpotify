import { Component, Input } from '@angular/core';

import { SpotifyArtist } from '../../models/spotify-artist.model';
import { SpotifyTrack } from '../../models/spotify-track.model';

@Component({
    selector: 'items-table',
    templateUrl: './items-table.component.html',
    styleUrls: ['./items-table.component.css']
})
export class ItemsTableComponent {
    private _artists: SpotifyArtist[];

    @Input('artists')
    set artists(items: SpotifyArtist[]) {
        this._artists = items;
	    this.genreArtists.push(...items);
    };
    get artists() : SpotifyArtist[] {
	    return this._artists;
    }

    genreArtists: SpotifyArtist[] = [];

    @Input()
    tracks: SpotifyTrack[];

    @Input()
    title: string;
}
