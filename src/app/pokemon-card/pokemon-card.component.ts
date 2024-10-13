import { Component, Input } from '@angular/core';
import { Pokemon } from '../types/Pokemon';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  constructor(private fb: FormBuilder, private apiService:ApiService) {} 
  myForm!: FormGroup;
  displayForm:boolean=false;
  editButtonText:string='Edit';
  @Input()
  pokemon!:Pokemon;

  ngOnInit() {
    this.myForm = this.fb.group({
      type: [this.parsetype(this.pokemon.type)],
      power: [this.pokemon.power],
      life: [this.pokemon.life],
    });
  }
  public onCancel(event:Event){
    event.preventDefault(); 
    this.displayForm=false;
    this.editButtonText = "Edit";
  }
  public onEdit(event:Event){
    event.preventDefault(); 
    this.displayForm=!this.displayForm
    if(this.displayForm){
      this.editButtonText = "Save";
      return;
    }
    this.editButtonText = "Edit";
    console.log({...this.myForm.value})
    this.apiService.updatePokemon(this.pokemon.id,{...this.myForm.value}).subscribe((data)=>{
      location.reload()
    })
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
