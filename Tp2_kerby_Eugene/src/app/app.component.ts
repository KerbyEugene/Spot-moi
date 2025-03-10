import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tp2_kerby';
  language : string = "fr";

  constructor(public translator : TranslateService) { 
    this.translator.setDefaultLang(this.language);
    this.translator.use(this.language);
  }

changeLanguage(){

  this.translator.use(this.language);

}
}
