import { SpotifyFollower } from './spotify-follower.model';
import { SpotifyImage } from './spotify-image.model';
import { SpotifyBaseEntity } from './spotify-base-entity.model';

export class SpotifyArtist extends SpotifyBaseEntity {
  followers: SpotifyFollower;
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
}
