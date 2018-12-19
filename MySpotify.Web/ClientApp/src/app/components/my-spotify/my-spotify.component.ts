import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'my-spotify',
  templateUrl: './my-spotify.component.html',
  styleUrls: ['./my-spotify.component.css']
})
export class MySpotifyComponent {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
	  this.activatedRoute.fragment.subscribe((hash : string) => {
		  //check lead Id here

        var params = this.parseQuery(hash);

        if (params['access_token']) {

        } else {
	        router.navigateByUrl("/spotify-authorize");
        }
		  debugger;

	  });
  }

	parseQuery(queryString) {
		var query = {};
		var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split('=');
			query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
		}
		return query;
	}
}
