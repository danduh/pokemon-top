import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pokemon-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  template: `<p>pokemon-list works!</p>`,
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {}
