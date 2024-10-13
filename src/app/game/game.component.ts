import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Pokemon } from '../types/Pokemon';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { Team } from '../types/team';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PokemonListComponent, PokemonComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  firstTeam: Team = { name: '', pokemons: [] };
  secondTeam: Team = { name: '', pokemons: [] };
  round:number=1;
  firstTeamPokemon_factor: any
  secondTeamPokemon_factor:any
  firstTeamPokemon: Pokemon = {
    name: '',
    image: '',
    life: 0,
    id: 0,
    power: 0,
    type: 1,
  };
  secondTeamPokemon: Pokemon = {
    name: '',
    image: '',
    life: 0,
    id: 0,
    power: 0,
    type: 1,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.creategame('Ashely', 'My Team');
  }

  public async creategame(firstTeamName: string, secondTeamName: string) {
    this.apiService
      .getBattleTeam(firstTeamName, secondTeamName)
      .subscribe((data) => {
        console.log(data);
        this.firstTeam = {
          pokemons: data.teams.firstTeam,
          name: data.firstTeamName,
        };
        this.secondTeam = {
          pokemons: data.teams.secondTeam,
          name: data.secondTeamName,
        };
        this.secondTeamPokemon = this.secondTeam.pokemons[0];
        this.firstTeamPokemon = this.firstTeam.pokemons[0];
      });
  }

  public selectPokemons(teamName: string, pokemonIndex: number) {
    console.log(teamName, this.firstTeam.name);
    if (this.firstTeam.name === teamName) {
      this.firstTeamPokemon = this.firstTeam.pokemons[pokemonIndex];
      return;
    } else if (this.secondTeam.name === teamName) {
      console.log(this.secondTeam.pokemons[pokemonIndex++]);
      this.secondTeamPokemon = this.secondTeam.pokemons[pokemonIndex];
      return;
    } else {
      console.log('cannot select pokemons');
    }
  }
  
public async getFactor(type1:number, type2:number){
  try{
     return this.apiService.getFactor(type1,type2)
  }
  catch(error){
    console.log(error)
    return null
  }
}


public async fight(){
  await this.apiService.getFactor(this.firstTeamPokemon.type,this.secondTeamPokemon.type).subscribe((factor)=>{
    this.firstTeamPokemon_factor = factor;
    console.log( this.firstTeamPokemon_factor);
    let lifeafterFight = this.firstTeamPokemon.life - this.secondTeamPokemon.power * this.firstTeamPokemon_factor;
      lifeafterFight > 0 ? this.firstTeamPokemon.life = lifeafterFight:this.firstTeamPokemon.life = 0
  })
  await this.apiService.getFactor(this.secondTeamPokemon.type,this.firstTeamPokemon.type).subscribe((factor)=>{
    this.secondTeamPokemon_factor = factor;
    
    let lifeAfterFight = this.secondTeamPokemon.life -  this.firstTeamPokemon.power * this.secondTeamPokemon_factor;
    lifeAfterFight > 0 ? this.secondTeamPokemon.life = lifeAfterFight: this.secondTeamPokemon.life = 0
  });

}

}
