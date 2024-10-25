import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [PokemonCardComponent,CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  pokemons:any=[]
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getFavoritePokemons().subscribe((data)=>{
      console.log(data);
      this.pokemons = [...data];
    })
  }
}
