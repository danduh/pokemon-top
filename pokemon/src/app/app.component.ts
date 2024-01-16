import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';

@Component({
  standalone: true,
  imports: [RouterModule, NzFooterComponent, NzContentComponent, NzHeaderComponent, NzLayoutComponent],
  selector: 'pokemon-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokemon';
}
