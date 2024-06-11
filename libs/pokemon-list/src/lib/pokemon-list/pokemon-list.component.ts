import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';

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
  ],
  selector: 'pokemon-list',
  styles: `
        nz-header {
        background: #ebebeb;
        padding: 16px;
      }
  `,
  template: `
    <nz-layout>
      <nz-header>
        <pokemon-list-header></pokemon-list-header>
      </nz-header>
      <nz-content>
        <pokemon-search></pokemon-search>
      </nz-content>
    </nz-layout>
  `,
})
export class PokemonListComponent {}
