import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'pokemon-list-entry',
  template: `<pokemon-nx-welcome></pokemon-nx-welcome>`,
})
export class RemoteEntryComponent {}
