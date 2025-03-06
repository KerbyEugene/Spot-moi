import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../services/artists.service';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css'
})
export class ShowsComponent {
constructor(public route: ActivatedRoute, public artistService: ArtistsService,public youtubeService: YoutubeService,){}
async ngOnInit() {
await this.youtubeService.getshows()
}
}
