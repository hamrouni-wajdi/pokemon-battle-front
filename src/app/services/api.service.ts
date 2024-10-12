import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
   public testPokedex(){
     return this.http.get<any>(this.pokedexUrl)
   }
}
