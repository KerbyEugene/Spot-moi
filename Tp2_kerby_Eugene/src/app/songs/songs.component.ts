import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArtistsService } from '../services/artists.service';
import { Song } from '../models/Song';
import { YoutubeService } from '../services/youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})
export class SongsComponent {
  Song:Song[]=[];
  albumid :string | null= null;
  videoId: string | null = null;
  albumName: string = '';
  videoUrl: string = '';
  safeUrl: SafeResourceUrl | null = null;

  constructor(public route: ActivatedRoute, public artistService: ArtistsService,public youtubeService: YoutubeService, private sanitizer: DomSanitizer) { }
  
  
 async ngOnInit() {
    this.albumid = this.route.snapshot.paramMap.get("id");
    this.albumName = this.route.snapshot.paramMap.get("name") || ''; 
   await this.artistService.connect();
    if(this.albumid)
    {
      this.getsongs(this.albumid)
    }
  }
async getsongs(albumId:string){
this.Song= await this.artistService.getSongs(albumId);
  }

  async getVideo(songName: string) {
    this.youtubeService.songName = songName; 
    this.videoId = await this.youtubeService.getvideo();
    this.videoUrl = `https://www.youtube.com/embed/${this.videoId}`; 
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl); 
  }
  getSafeUrl(): SafeResourceUrl {
    return this.safeUrl || ''; 
  }
}
