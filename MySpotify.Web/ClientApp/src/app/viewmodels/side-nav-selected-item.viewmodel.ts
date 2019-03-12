import { SpotifyUserTopType } from '../models/spotify-type.enum';
import { SpotifyDuration } from '../models/spotify-duration.enum';

export class SideNaveSelectedItem {
    type: SpotifyUserTopType;
    duration: SpotifyDuration;

    constructor(type: SpotifyUserTopType, duration: SpotifyDuration) {
        this.type = type;
        this.duration = duration;
    }
}
