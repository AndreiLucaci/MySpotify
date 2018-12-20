import { SpotifyBaseEntity } from './spotify-base-entity.model';
import { SpotifyExternalUrl } from './spotify-external-url.model';
import { SpotifyImage } from './spotify-image.model';

export class SpotifyAlbum extends SpotifyBaseEntity {
  album_group: string;
  album_type: string;
  artists: SpotifyBaseEntity[];
  available_markets: string[];
  external_urls: SpotifyExternalUrl;
  images: SpotifyImage[];
  release_date: string;
  release_date_precision: string;
  restrictions: string;
}
