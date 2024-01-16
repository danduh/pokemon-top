import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import { PokemonService } from '../services/pokemon.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'pokemon-search',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, NzRowDirective],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers:[]
})
export class SearchComponent implements OnInit{
  constructor(private pokemonService: PokemonService, private changeRef: ChangeDetectorRef) {
  }
  pokemons = this.pokemonService.getPokemons();
  // pokemons!: Observable<any>;
  ngOnInit() {
    this.pokemonService.initialLoad()
    this.pokemons = this.pokemonService.getPokemons();
    // this.pokemons.pipe(tap((data) => {
    //   console.log(data)
    //   this.changeRef.detectChanges();
    // })).subscribe()
    // this.pokemonService.initialLoad()
  }

}
