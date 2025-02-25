import { Component } from '@angular/core';
import { ArtistsService } from '../services/artists.service';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/Artist';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent {

  artistName: string ="";
  artist ?:Artist;
  
  constructor(public http : HttpClient,public artisteService : ArtistsService){}
  ngOnInit() : void{

    this.artisteService.connect();
  
  }

  async getArtist() : Promise<void>{
    this.artist = await this.artisteService.getArtist(this.artistName)
    
  }

}
