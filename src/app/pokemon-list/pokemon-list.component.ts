import { Component, Input } from '@angular/core';
import { Pokemon } from '../types/Pokemon';
import { PokemonComponent } from "../pokemon/pokemon.component";
import { CommonModule } from '@angular/common';
import { PokemonIconComponent } from "../pokemon-icon/pokemon-icon.component";
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonComponent, CommonModule, PokemonIconComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})

export class PokemonListComponent {
  @Input()
  pokemons:Pokemon[]=[]
  @Input()
  teamName:string = "";
}
