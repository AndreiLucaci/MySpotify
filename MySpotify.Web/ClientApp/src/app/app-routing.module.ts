import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from "./components/not-found/not-found.component";

import { SpotifyAuthorizeComponent } from "./components/spotify-authorize/spotify-authorize.component";
import { MySpotifyComponent } from "./components/my-spotify/my-spotify.component";


const routes: Routes = [
  { path: "", redirectTo: "/spotify-authorize", pathMatch: "full" },
  { path: "home", redirectTo: "/", pathMatch: "full" },
  { path: "spotify-authorize", component: SpotifyAuthorizeComponent, data: { title: "Connectig with Spotify" } },
  { path: "my-spotify", component: MySpotifyComponent, data: { title: "Crunching Spotify data" } },
  { path: "**", component: NotFoundComponent, data: { title: "Page Not Found" } }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
