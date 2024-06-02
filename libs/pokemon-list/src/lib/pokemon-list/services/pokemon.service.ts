import { Injectable } from '@angular/core';
import { NamedAPIResource, PokemonClient, TypePokemon } from 'pokenode-ts';
import { BehaviorSubject, Subject } from 'rxjs';

export interface BetterPokemon extends NamedAPIResource {
  id: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  api = new PokemonClient();

  public pokemons: BehaviorSubject<BetterPokemon[]> = new BehaviorSubject(
    [] as BetterPokemon[]
  );
  public pokemonTypes: Subject<NamedAPIResource[]> = new Subject();
  constructor() {}

  initialLoad() {
    this.api.listPokemons(0, 10).then((data) => {
      this.pokemons.next(this.handlePokemonIds(data.results));
    });
    // .catch((error) => console.error(error));
  }
  getPokemons() {
    return this.pokemons;
  }
  loadTypes() {
    this.api.listTypes().then((data) => {
      this.pokemonTypes.next(data.results);
    });
  }

  filterByTypeName(type: string) {
    this.api.getTypeByName(type).then((data) => {
      this.pokemons.next(this.handlePokemonIds(data.pokemon));
    });
  }

  handlePokemonIds(
    typePokemons: TypePokemon[] | NamedAPIResource[]
  ): BetterPokemon[] {
    return typePokemons.map((slot) => {
      let pokemon;

      if ((slot as TypePokemon).pokemon) {
        pokemon = (slot as TypePokemon).pokemon;
      } else {
        pokemon = slot;
      }

      const url = (pokemon as NamedAPIResource).url.match(/(\d+)\/?$/);
      const id = Array.isArray(url) && url.length > 1 ? parseInt(url[1]) : null;
      return { ...pokemon, id } as BetterPokemon;
    });
  }
}
