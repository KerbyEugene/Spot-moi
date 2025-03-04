import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Album } from '../models/Album';
import { Artist } from '../models/Artist';
import { ArtistsService } from '../services/artists.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  
  artistId :string | null= null;
  Album: Album[] = [];
  artistName:string | null= null;
  constructor(public route: ActivatedRoute, public artistService: ArtistsService) { }
  
  
  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get("id"); 
    this.artistService.connect();
   
    if (this.artistId) {
      this.getAlbums(this.artistId);  
    }
  }
  async getAlbums(artistId: string) {
    this.Album = await this.artistService.getAlbums(artistId);
  }
}
