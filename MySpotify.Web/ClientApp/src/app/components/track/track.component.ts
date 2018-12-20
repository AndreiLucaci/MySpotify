import { Component, Input } from '@angular/core';

import { SpotifyTrack } from '../../models/spotify-track.model';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {
  @Input()
  trackObj: SpotifyTrack = new SpotifyTrack();
}
