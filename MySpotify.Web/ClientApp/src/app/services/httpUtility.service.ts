import { Injectable } from '@angular/core';

@Injectable()
export class HttpUtilityService {
	serialize(obj, prefix) {
		var str = [],
			p;
		for (p in obj) {
			if (obj.hasOwnProperty(p)) {
				var k = prefix ? prefix + "[" + p + "]" : p,
					v = obj[p];
				str.push((v !== null && typeof v === "object") ?
					this.serialize(v, k) :
					encodeURIComponent(k) + "=" + encodeURIComponent(v));
			}
		}
		return str.join("&");
  }

	removeHash() {
		var scrollV, scrollH, loc = window.location;
		if ("pushState" in history)
			history.pushState("", document.title, loc.pathname + loc.search);
		else {
			// Prevent scrolling by storing the page's current scroll offset
			scrollV = document.body.scrollTop;
			scrollH = document.body.scrollLeft;

			loc.hash = "";

			// Restore the scroll offset, should be flicker free
			document.body.scrollTop = scrollV;
			document.body.scrollLeft = scrollH;
		}
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
