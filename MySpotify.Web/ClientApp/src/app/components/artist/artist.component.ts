import { Component, Input } from '@angular/core';

import { SpotifyArtist } from '../../models/spotify-artist.model';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {
  @Input()
  artistObj: SpotifyArtist;

  getArtistImage(): string {
    const artist = this.artistObj.images.sort((v1, v2) => v2.width - v1.width)[0];
    if (artist && artist.url) {
      return artist.url;
    } else {
      return "";
    }
  }
}
