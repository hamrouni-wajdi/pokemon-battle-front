import { Component, Input } from '@angular/core';
import { Pokemon } from '../types/Pokemon';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  constructor(private fb: FormBuilder) {} 
  myForm!: FormGroup;
  displayForm:boolean=false;
  editButtonText:string='Edit';
  @Input()
  pokemon!:Pokemon;

  ngOnInit() {
    this.myForm = this.fb.group({
      type: [''],
      power: [''],
      life: [''],
    });
  }
  public onEdit(){
    this.displayForm=!this.displayForm
    if(this.displayForm){
      this.editButtonText = "Save";
      return;
    }
    this.editButtonText = "Edit";

    console.log('Input 1:', this.myForm.value.type);
    console.log('Input 2:', this.myForm.value.power);
    console.log('Input 3:', this.myForm.value.life);
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
