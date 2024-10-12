import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Pokemon } from '../types/Pokemon';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  constructor(private apiService :ApiService){}

  ngOnInit(){
    this.apiService.getPokemons().subscribe(data=>console.log(data));
  }
}
