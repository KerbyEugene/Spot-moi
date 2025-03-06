import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArtistsService } from '../services/artists.service';
import { YoutubeService } from '../services/youtube.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Shows } from '../models/Shows';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [GoogleMapsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css'
})
export class ShowsComponent {
  artisteName: string | null= null;
  

constructor(public route: ActivatedRoute, public artistService: ArtistsService,public youtubeService: YoutubeService,){}

center : google.maps.LatLngLiteral = {lat : 42, lng : -4};
zoom : number = 5;

async ngOnInit() {
  this.artisteName = this.route.snapshot.paramMap.get("name");
  if(this.artisteName)
    {
      await this.youtubeService.getshows(this.artisteName)
    }
}

}
