import { Component, Input } from '@angular/core';
import { Pokemon } from '../types/Pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {

 displayForm:boolean=false;
 @Input()
 pokemon!:Pokemon;

 public onEdit(){
  this.displayForm=true
 }

}
