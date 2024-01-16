import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  standalone: true,
  imports: [CommonModule, SearchComponent, NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, HeaderComponent],
  selector: 'pokemon-list-entry',
  styles:`
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
          <nz-footer>Footer</nz-footer>
      </nz-layout>
      `,
})
export class RemoteEntryComponent {}
