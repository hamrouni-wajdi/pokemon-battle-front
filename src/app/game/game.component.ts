import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Pokemon } from '../types/Pokemon';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonComponent } from "../pokemon/pokemon.component";
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PokemonListComponent, PokemonComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  firstTeam:Pokemon [] = [];
  secondTeam:Pokemon [] = [];
  firstTeamPokemon!:Pokemon;
  secondTeamPokemon!:Pokemon;
  
  constructor(private apiService :ApiService){}

  ngOnInit(){
    this.creategame("Ashely","My Team");
    console.log(this.firstTeam);
    console.log(this.secondTeam);
  }

  public creategame(firstTeamName:string,secondTeamName:string){
    this.apiService.getBattleTeam(firstTeamName, secondTeamName).subscribe((data)=>{
      this.firstTeam = data.teams.firstTeam;
      this.secondTeam = data.teams.secondTeam;
      console.log(this.firstTeam);
      console.log(this.secondTeam);
    })
  }

}
