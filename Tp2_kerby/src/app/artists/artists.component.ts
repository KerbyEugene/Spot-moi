import { Component } from '@angular/core';
import { ArtistsService } from '../services/artists.service';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/Artist';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Album } from '../models/Album';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent {

  artistName: string ="";
  artist ?:Artist;
  artistList: Artist[]=[];
  
  
  constructor(public router : Router,public http : HttpClient,public artisteService : ArtistsService){}
  ngOnInit() : void{

    this.artisteService.connect();
  
  }
 
  async getArtist() : Promise<void>{
    this.artistList.push(await this.artisteService.getArtist(this.artistName)) 
  
  }
 
  
  Gotoalbums(){
    this.router.navigate(["/album"])
  }
  Clear(){
    this.artistList=[];
  }

 
}
