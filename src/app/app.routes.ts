import { Routes } from '@angular/router';
import { PokemonDashboardComponent } from './pokemon-dashboard/pokemon-dashboard.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { TeamComponent } from './team/team.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    { path: 'pokemons', component: PokemonDashboardComponent },    
    { path: 'favorites', component: FavoritesComponent},
    { path: 'teams', component: TeamComponent},
    { path: 'battle', component: GameComponent},
    { path: '', component: PokemonDashboardComponent },
];
