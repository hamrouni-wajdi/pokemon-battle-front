import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { CommonModule } from '@angular/common';
import { PokemonIconComponent } from '../pokemon-icon/pokemon-icon.component';


@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, PokemonIconComponent, PokemonListComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  constructor(private apiService: ApiService) {}
  teams: any;
  pokemons: any = [];
  displayTeams:boolean=true;
  displayPokemons:boolean=false;
  selectedPokemonsIds:number[]=[]
  ngOnInit() {
    this.apiService.getTeamsOrderedByPower().subscribe((data) => {
      this.teams = data.teams;
      console.log(this.teams);
    });
    this.apiService.getPokemons().subscribe((data) => {
      console.log(data);
      this.pokemons = [...data.rows];
    });
  }
  private toggleDisplay(){
    this.displayPokemons =!this.displayPokemons;
    this.displayTeams=!this.displayTeams;
  }
  public onCreateTeam(){
    this.toggleDisplay()
  }

  public onSelection(e:Event){
    e.preventDefault()
    const target = e.target as HTMLImageElement;
    let selectedPokemonId = target.id;
    console.log(selectedPokemonId) 
    if(Number(selectedPokemonId)<=0){
      return;
    }
    if(!this.selectedPokemonsIds.includes(Number(selectedPokemonId))){
      if(this.selectedPokemonsIds.length >=6){
        console.log("team ready and full");
        return;
      }
      this.selectedPokemonsIds.push(Number(selectedPokemonId));
      console.log(this.selectedPokemonsIds)
      target.classList.add('selected');
      return;
    }
    console.log("pokemon already exists")
    this.selectedPokemonsIds = this.selectedPokemonsIds.filter((id)=> id !==Number(selectedPokemonId) )
    target.classList.remove('selected');
    console.log(this.selectedPokemonsIds)
    return;
  }
}
