import { Routes } from '@angular/router';
import { ArtistsComponent } from './artists/artists.component';
import { AlbumsComponent } from './albums/albums.component';
import { SongsComponent } from './songs/songs.component';
import { ShowsComponent } from './shows/shows.component';

export const routes: Routes = [
    {path: "", redirectTo: "/artiste", pathMatch: "full"},
    {path: "artiste", component: ArtistsComponent},
    {path: "album", component: AlbumsComponent},
    {path: "songs", component: SongsComponent},
    {path: "shows", component: ShowsComponent},
    
  ];
