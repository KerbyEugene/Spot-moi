import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  songName:string=""
  cle:string="AIzaSyB6E2LuMeGqfoZFct0mVPxJZD4RCl-Wgfc"
  constructor(public http : HttpClient){}
  
   async getvideo(){
    let x= await lastValueFrom(this.http.get<any>(`https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=${this.cle}&q=${this.songName}`)) 
    return x.items[0].id.videoId
  }
}
