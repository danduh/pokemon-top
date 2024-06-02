import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  HeaderComponent,
  PokemonListComponent,
  SearchComponent,
} from '@pokemon/pokemon-list';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzFooterComponent,
    HeaderComponent,
    PokemonListComponent,
  ],
  selector: 'pokemon-list-entry',
  styles: `
        nz-header {
        background: #ebebeb;
        padding: 16px;
      }
  `,
  template: ` <pokemon-list></pokemon-list> `,
})
export class RemoteEntryComponent {}
