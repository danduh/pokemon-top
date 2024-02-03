import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../components/header/header.component';
import { SearchComponent } from '../search/search.component';

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
  selector: 'pokemon-list-entry',
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
      <nz-footer
        >Pokémon and Pokémon character names are trademarks of
        Nintendo</nz-footer
      >
    </nz-layout>
  `,
})
export class RemoteEntryComponent {}
