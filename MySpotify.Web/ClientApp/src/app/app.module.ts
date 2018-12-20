import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

import { ToastaModule } from 'ngx-toasta';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PopoverModule } from "ngx-bootstrap/popover";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';

import { AppComponent } from './components/app/app.component';

import { SpotifyAuthorizeComponent } from "./components/spotify-authorize/spotify-authorize.component";
import { MySpotifyComponent } from "./components/my-spotify/my-spotify.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TileTrackComponent } from './components/tile-track/tile-track.component';
import { TrackComponent } from './components/track/track.component';

import { SettingsService } from "./services/settings.service";
import { HttpUtilityService } from "./services/httpUtility.service";
import { SpotifyService } from "./services/spotify.service";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ToastaModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    AppComponent,
    SpotifyAuthorizeComponent,
    MySpotifyComponent,
    NotFoundComponent,
    NavBarComponent,
    LoadingComponent,
    TileTrackComponent,
    TrackComponent,
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    SettingsService,
    SpotifyService,
	  HttpUtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
