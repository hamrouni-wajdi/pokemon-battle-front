import { Component, Input } from '@angular/core';
import { Pokemon } from '../types/Pokemon';
@Component({
  selector: 'app-pokemon-icon',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-icon.component.html',
  styleUrl: './pokemon-icon.component.scss'
})
export class PokemonIconComponent {

  @Input()
    pokemon!:Pokemon

}
