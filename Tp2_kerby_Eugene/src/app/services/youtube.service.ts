import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Shows } from '../models/Shows';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  songName:string="";
  artistName:string="";
  cle:string="AIzaSyB6E2LuMeGqfoZFct0mVPxJZD4RCl-Wgfc";
  cleConcert:string="2b32475766802ac01eefda45e9e42ea0";
  city:string="";
  country:string="";
  latitude:string="";
  longitude:string="";
 
  constructor(public http : HttpClient){}
  
   async getvideo(){
    let x= await lastValueFrom(this.http.get<any>(`https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=${this.cle}&q=${this.songName}`)) 
    return x.items[0].id.videoId
  }

  async getshows(artistName:string){
    let x= await lastValueFrom(this.http.get<any>(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=${this.cleConcert}`))
    console.log(x);
    
     let shows : Shows[]=[];
     for(let i = 0; i < x.length; i++){
      let latitude = x[i].venue.latitude;
      let longitude = x[i].venue.longitude;
    
      shows.push(new Shows(x[i].venue.country,x[i].venue.city,x[i].datetime,parseFloat(latitude),parseFloat(longitude) ));
    }
     return shows
  }
}
