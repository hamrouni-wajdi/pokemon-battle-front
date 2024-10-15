import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Pokemon } from '../types/Pokemon';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { Team } from '../types/team';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PokemonListComponent, PokemonComponent, CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  firstTeam: Team = { name: '', pokemons: [] };
  secondTeam: Team = { name: '', pokemons: [] };
  round: number = 1;
  firstTeamPokemon_factor: any;
  secondTeamPokemon_factor: any;
  firstTeamName: string = '';
  secondTeamName: string = '';
  firstTeamDamage: number = 0;
  secondTeamDamage: number = 0;
  gameOver: boolean = false;
  winner: string = '';
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
    // this.creategame('Wajdi', 'liko');
  }
  public confirmTeams() {
    this.creategame(this.firstTeamName, this.secondTeamName);
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

  public async getFactor(type1: number, type2: number) {
    try {
      return this.apiService.getFactor(type1, type2);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  private updateCurrentPokemonFirstTeam() {
    this.firstTeam.pokemons.shift();
    this.firstTeamPokemon = this.firstTeam.pokemons[0];
  }
  private updateCurrentPokemonSecondTeam() {
    this.secondTeam.pokemons.shift();
    this.secondTeamPokemon = this.secondTeam.pokemons[0];
  }

  private calucalteDamage(team: Team) {
    if (team === this.firstTeam) {
      return this.secondTeamPokemon.power * this.firstTeamPokemon_factor;
    } else if (team === this.secondTeam) {
      return this.firstTeamPokemon.power * this.secondTeamPokemon_factor;
    }
    console.error('error in calucalate damage');
    throw new Error('error in calucalate damage');
  }

  public async fight() {
    this.apiService
      .getFactor(this.firstTeamPokemon.type, this.secondTeamPokemon.type)
      .subscribe((factor) => {
        this.firstTeamPokemon_factor = factor;
        console.log('first factor  ', this.firstTeamPokemon_factor);
        this.firstTeamDamage =
          this.secondTeamPokemon.power * this.firstTeamPokemon_factor;

        console.log(
          'damage',
          this.firstTeamDamage,
          this.calucalteDamage(this.firstTeam)
        );
        console.log('frist team type', this.firstTeam.pokemons[0].type);
        this.firstTeamPokemon.life =
          this.firstTeamPokemon.life - this.calucalteDamage(this.firstTeam);

        if (this.firstTeamPokemon.life <= 0) {
          if (this.firstTeam.pokemons.length <= 1) {
            console.log(this.firstTeam, ' first team looses');
            console.log(this.firstTeamPokemon);
            this.winner = this.secondTeamName;
            this.gameOver = true;
            return;
          }
          this.updateCurrentPokemonFirstTeam();
        }
      });
    this.apiService
      .getFactor(this.secondTeamPokemon.type, this.firstTeamPokemon.type)
      .subscribe((factor) => {
        this.secondTeamPokemon_factor = factor;
        console.log('second factor ', this.secondTeamPokemon_factor);
        console.log('second team type', this.secondTeam.pokemons[0].type);

        this.secondTeamPokemon.life =
          this.secondTeamPokemon.life - this.calucalteDamage(this.secondTeam);

        this.secondTeamDamage =
          this.firstTeamPokemon.power * this.secondTeamPokemon_factor;
        console.log(
          'damage 2 ',
          this.secondTeamDamage,
          this.calucalteDamage(this.secondTeam)
        );
        if (this.secondTeamPokemon.life <= 0) {
          if (this.secondTeam.pokemons.length <= 1) {
            console.log(this.secondTeam, 'second team looses');
            console.log(this.secondTeamPokemon);
            this.winner = this.firstTeamName;
            this.gameOver = true;
            return;
          }
          this.updateCurrentPokemonSecondTeam();
        }
      });
  }
}
