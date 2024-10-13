import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Pokemon } from '../types/Pokemon';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonComponent } from "../pokemon/pokemon.component";
import { Team } from '../types/team';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PokemonListComponent, PokemonComponent,CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  firstTeam:Team = {name:"",pokemons:[]}
  secondTeam:Team = {name:"",pokemons:[]}
  firstTeamPokemon:Pokemon={name:'',image:'',life:0,id:0,power:0,type:1}
  secondTeamPokemon:Pokemon={name:'',image:'',life:0,id:0,power:0,type:1}

  
  constructor(private apiService :ApiService){}

  ngOnInit(){
  }
  ngAfterViewInit(){
    this.creategame("Ashely","My Team");
    this.selectPokemons("Ashely",0)
  }

  public async creategame(firstTeamName:string,secondTeamName:string){
   this.apiService.getBattleTeam(firstTeamName, secondTeamName).subscribe((data)=>{
        console.log(data)
        this.firstTeam = {pokemons:data.teams.firstTeam,name:data.firstTeamName}
        this.secondTeam = {pokemons:data.teams.secondTeam,name:data.secondTeamName}
        this.secondTeamPokemon = this.secondTeam.pokemons[0]
        this.firstTeamPokemon = this.firstTeam.pokemons[0]
   
    })
  }

 public selectPokemons(teamName:string,pokemonIndex:number){
  console.log(teamName,this.firstTeam.name)
  if(this.firstTeam.name === teamName){
    this.firstTeamPokemon = this.firstTeam.pokemons[pokemonIndex];
    return;
  }
  else if(this.secondTeam.name === teamName) {
    console.log(this.secondTeam.pokemons[pokemonIndex++])
    this.secondTeamPokemon = this.secondTeam.pokemons[pokemonIndex];
    return;
  }
  else{
    console.log("cannot select pokemons")
  }
  }

 }

