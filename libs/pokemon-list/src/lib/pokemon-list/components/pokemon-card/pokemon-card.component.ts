import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { BetterPokemon } from '../../services/pokemon.service';
import { PictureComponent } from '../picture/picture.component';

@Component({
  selector: 'pokemon-pokemon-card',
  standalone: true,
  imports: [
    CommonModule,
    NzCardMetaComponent,
    NzCardComponent,
    PictureComponent,
    RouterLink,
    NzButtonComponent,
    NzButtonComponent,
    NzButtonComponent,
  ],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  @Input() pokemon!: BetterPokemon;
  @Input() pokeId!: number;
  constructor(private router: Router) {}
  navigateTo() {
    this.router.navigateByUrl(`/details/name/${this.pokemon.name}`);
  }
}
