import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NamedAPIResource } from 'pokenode-ts';
import { PictureComponent } from '../components/picture/picture.component';
import { BetterPokemon } from '../services/pokemon.service';

@Component({
  selector: 'pokemon-pokemon-card',
  standalone: true,
  imports: [CommonModule, NzCardMetaComponent, NzCardComponent,PictureComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent{
  @Input() pokemon!: BetterPokemon;
  @Input() pokeId!: number;
}
