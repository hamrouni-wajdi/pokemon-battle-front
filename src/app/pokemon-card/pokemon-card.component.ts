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

  @Input()
  isFavorite:boolean=false;
  ngOnInit() {
    this.myForm = this.fb.group({
      type: [this.parsetype(this.pokemon.type)],
      power: [this.pokemon.power,  [
        Validators.required, 
        Validators.min(10),   
        Validators.max(100)   
      ]],
      life: [this.pokemon.life,  [
        Validators.required, 
        Validators.min(50),   
        Validators.max(100)   
      ]],
    });
  }
 
  public toggleForm(){
    this.displayForm=!this.displayForm
    if(this.displayForm){
      this.editButtonText = "Cancel";
      return;
    }
    this.editButtonText = "Edit";
  }
  public onEdit(event:Event){
   this.toggleForm()
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
  handleFavoritePokemon(){
    console.log("pokemon id",this.pokemon.id);
    if(this.isFavorite){
      this.apiService.removeFromFavorites(this.pokemon.id).subscribe((data)=>{
        console.log(data)
      })
    }
    this.apiService.addToFavorites(this.pokemon.id).subscribe((data)=>{
      console.log(data)
    })
  }
}
