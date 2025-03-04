import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArtistsService } from '../services/artists.service';
import { Song } from '../models/Song';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})
export class SongsComponent {
  Song:Song[]=[];
  songsname:string="";
  albumid :string | null= null;

  constructor(public route: ActivatedRoute, public artistService: ArtistsService) { }
  
  
 async ngOnInit() {
    this.albumid = this.route.snapshot.paramMap.get("id"); 
   await this.artistService.connect();
    if(this.albumid)
    {
      this.getsongs(this.albumid)
    }
  }
async getsongs(albumId:string){
this.Song= await this.artistService.getSongs(albumId);
  }
}
