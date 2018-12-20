import { SpotifyBaseEntity } from './spotify-base-entity.model';
import { SpotifyAlbum } from './spotify-album.model';
import { SpotifyExternalId } from './spotify-external-id.model';
import { SpotifyBaseLink } from './spotify-base-link.model';

export class SpotifyTrack extends SpotifyBaseEntity {
  album: SpotifyAlbum;
  artists: SpotifyBaseEntity[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalId;
	is_playable: boolean;
  linked_from: SpotifyBaseLink;
  popularity: number;
  preview_url: string;
  track_number: number;
}
