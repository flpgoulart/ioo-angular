import { Component } from '@angular/core';
import { TokenService } from "./shared/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Estou em Oferta - Maneira inteligente de poupar tempo e dinheiro';
  public constructor(private tokenService: TokenService) {
    this.tokenService.init({
      apiBase: 'http://api.ioo.test:3000',
      globalOptions: {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/vnd.ioo.v3'
        }
      }
    })
  }
}