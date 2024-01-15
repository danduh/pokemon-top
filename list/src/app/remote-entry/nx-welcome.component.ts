import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-nx-welcome',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  template: `
    <div class="container">
        <pokemon-pokemon-card></pokemon-pokemon-card>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
