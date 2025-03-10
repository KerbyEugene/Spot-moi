import { Component } from '@angular/core';
import { ArtistsService } from '../services/artists.service';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/Artist';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Album } from '../models/Album';
import { YoutubeService } from '../services/youtube.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,TranslateModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent {

  artistName: string ="";
  artist ?:Artist;
  artistList: Artist[]=[];
  
  
  constructor(public router : Router,public http : HttpClient,public artisteService : ArtistsService,public youtubeService:YoutubeService,){}
 

  ngOnInit() : void{

    this.artisteService.connect();

  let favlist:string  | null = localStorage.getItem("favs");
  if (favlist!=null){
    this.artistList=JSON.parse(favlist);
  }
  
  }
 
  async getArtist() : Promise<void>{
    this.artistList.push(await this.artisteService.getArtist(this.artistName)) 
    localStorage.setItem("favs", JSON.stringify(this.artistList));
  }
 
  
 
  Clear(){
    this.artistList=[];
  }

 goShow(){
  this.youtubeService.getshows(this.artistName)
 }
 
}
