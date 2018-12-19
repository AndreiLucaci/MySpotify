import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../../services/spotify.service';

@Component({
  styleUrls: ['./spotify-authorize.component.css'],
  selector: 'spotify-authorize',
  templateUrl: './spotify-authorize.component.html'
})
export class SpotifyAuthorizeComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {
	  
  }

	ngOnInit(): void {
	  this.spotifyService.connectWithSpotify();	
	}
}
