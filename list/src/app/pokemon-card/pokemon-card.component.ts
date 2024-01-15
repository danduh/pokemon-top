import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'pokemon-pokemon-card',
  standalone: true,
  imports: [CommonModule, NzCardMetaComponent, NzCardComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {}
