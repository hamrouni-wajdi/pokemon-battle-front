import { Component, Input } from '@angular/core';
import { Pokemon } from '../types/Pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  displayForm:boolean=false;
  editButtonText:string='Edit';
  @Input()
  pokemon!:Pokemon

  public onEdit(){
    this.displayForm=!this.displayForm
    if(this.displayForm){
      this.editButtonText = "Save";
      return;
    }
    this.editButtonText = "Edit";
   }  

  public parsetype(input: string | number): string | number | undefined {
    const types: { [key: number]: string } = {
      1: 'fire',
      2: 'water',
      3: 'grass'
    };
  
    if (typeof input === 'number') {
      return types[input] || 'Unknown type';
    } else if (typeof input === 'string') {
      const typeKey = Object.keys(types).find(key => types[Number(key)] === input);
      return typeKey ? Number(typeKey) : 'Unknown type';
    }
    return undefined;
  }
}
