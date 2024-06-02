import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { PictureComponent } from '../components/picture/picture.component';
import { BetterPokemon } from '../services/pokemon.service';

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
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  @Input() pokemon!: BetterPokemon;
  @Input() pokeId!: number;
  constructor(private router: Router) {}
  navigateTo() {
    this.router.navigateByUrl(`/details/name/${this.pokemon.name}`);
  }
}
