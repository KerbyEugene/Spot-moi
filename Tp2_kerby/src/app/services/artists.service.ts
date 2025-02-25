import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../models/Artist';
const CLIENT_ID : string = "82fe545070404d02b2306a885fbf9ed8";
const CLIENT_SECRET : string = "3a9a465174bf4cb6b75d7f1f2a4ca20e";
@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  
  spotifyToken : string | null = null ;

  constructor(public http : HttpClient) { }
  
  async connect() : Promise<void> {

    // Création d'une en-tête spéciale qui accompagnera la requête de connexion.
    // Cette en-tête contient d'ailleurs le CLIENT_ID et le CLIENT_SECRET !
    let body = new HttpParams().set('grant_type', 'client_credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      })
    };
    let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions))
    console.log(x);
    this.spotifyToken = x.access_token; // Stockage du token
  
  }
  async getArtist(artistName : string): Promise<Artist> {

    // Création des en-têtes
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };
    
    // Requête avec authentification
    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artistName, httpOptions));
    console.log(x);
    return new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[0].url);
   
  }
}
