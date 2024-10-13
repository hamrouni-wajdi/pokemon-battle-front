import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../types/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  baseUrl = "http://localhost:8080/api";
  pokedexUrl = "https://pokemondb.net/pokedex/all";
  
  
  public getPokemons():Observable<Pokemon[]>{
   return this.http.get<any>(`${this.baseUrl}/pokemons`)
    }
   
    public getBattleTeam(firstTeamName:string,secondTeamName:string):Observable<any>{
      return this.http.post(`${this.baseUrl}/team/getPokemonsInBattle`,{firstTeamName,secondTeamName})
    }
    public getFactor(type1:number,type2:number){
      let params = new HttpParams()
      .set('type1', type1)
      .set('type2', type2);
      return this.http.post(`${this.baseUrl}/game/factor`,{type1,type2})
    }
}
