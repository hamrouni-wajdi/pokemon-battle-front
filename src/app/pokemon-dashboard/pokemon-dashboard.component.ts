import { Component, Input } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { CommonModule } from '@angular/common';
import { Pokemon } from '../types/Pokemon';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pokemon-dashboard',
  standalone: true,
  imports: [PokemonCardComponent,CommonModule],
  templateUrl: './pokemon-dashboard.component.html',
  styleUrl: './pokemon-dashboard.component.scss'
})
export class PokemonDashboardComponent {
  pokemons:any=[]
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPokemons().subscribe((data)=>{
      console.log(data);
      this.pokemons = [...data.rows];
    })
  }
}
