import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'pokemon-list-entry',
  template: `<pokemon-nx-welcome></pokemon-nx-welcome>`,
})
export class RemoteEntryComponent {
  // constructor(private injector: Injector) {}
  // static render(container: HTMLElement): void {
  //   bootstrapApplication(RemoteEntryComponent, {
  //     hostElement: container,
  //   });
  // }
}
