import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { SideNaveSelectedItem } from '../../viewmodels/side-nav-selected-item.viewmodel';

import { SpotifyUserTopType } from '../../models/spotify-type.enum';
import { SpotifyDuration } from '../../models/spotify-duration.enum';

@Component({
    selector: 'side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
    ngOnInit(): void {
        setTimeout(() => {
            this.setSelectedItem(SpotifyUserTopType.Tracks, SpotifyDuration.ShortTerm);
        }, 1000);
    }

    selectedItem: SideNaveSelectedItem;

    @Output() selectedItemChanged = new EventEmitter();

    type = SpotifyUserTopType;
    duration = SpotifyDuration;
    
    setSelectedItem(type: SpotifyUserTopType, duration: SpotifyDuration) {
        this.selectedItem = new SideNaveSelectedItem(type, duration);

        this.selectedItemChanged.emit(this.selectedItem);
    }
}
