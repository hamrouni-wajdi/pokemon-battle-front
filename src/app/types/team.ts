import { Pokemon } from "./Pokemon"


export interface Team {
    name:string,
    pokemons:Pokemon[],
    team_id?:number,
    team_name?:string,
    total_power?:number
}