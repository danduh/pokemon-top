import { Builder } from 'builder-pattern';
import { Chance } from 'chance';
import {
  NamedAPIResource,
  OtherPokemonSprites,
  Pokemon,
  PokemonAbility,
  PokemonMove,
  PokemonSprites,
  PokemonType,
  type NamedAPIResourceList,
  type Type,
  type TypePokemon,
} from 'pokenode-ts';
const chance = new Chance();

const aNamedAPIResource = () =>
  Builder<NamedAPIResource>().name(chance.word()).url(chance.url()).build();

export const aNamedAPIResourceList = (count: number = 10) =>
  Builder<NamedAPIResourceList>()
    .count(count)
    .results(chance.n(() => aNamedAPIResource(), count))
    .build();
export const anAbility = () =>
  Builder<PokemonAbility>().ability(aNamedAPIResource()).build();

export const aPokemonType = () =>
  Builder<PokemonType>().type(aNamedAPIResource()).build();

export const aMove = () =>
  Builder<PokemonMove>().move(aNamedAPIResource()).build();

export const aType = (count: number = 10) =>
  Builder<Type>()
    .name(chance.word())
    .pokemon(
      chance.n(
        () => Builder<TypePokemon>().pokemon(aNamedAPIResource()).build(),
        count
      )
    )
    .build();

export const aPokemon = (id: number = chance.integer({ min: 1, max: 500 })) =>
  Builder<Pokemon>()
    .name(chance.word())
    .id(id)
    .moves(chance.n(aMove, chance.integer({ min: 1, max: 10 })))
    .types(chance.n(aPokemonType, chance.integer({ min: 1, max: 10 })))
    .abilities(chance.n(anAbility, chance.integer({ min: 1, max: 10 })))
    .sprites(
      Builder<PokemonSprites>()
        .other(
          Builder<OtherPokemonSprites>()
            ['official-artwork']({
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
            })
            .build()
        )
        .build()
    )
    .build();
