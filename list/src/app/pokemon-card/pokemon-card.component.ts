import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { PictureComponent } from '../components/picture/picture.component';
import { BetterPokemon } from '../services/pokemon.service';
import { Router, RouterLink } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'pokemon-pokemon-card',
  standalone: true,
  imports: [CommonModule, NzCardMetaComponent, NzCardComponent, PictureComponent, RouterLink, NzButtonComponent, NzButtonComponent, NzButtonComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent{
  @Input() pokemon!: BetterPokemon;
  @Input() pokeId!: number;
  constructor(
    private router: Router){
  }
  navigateTo(){
    // this.router.navigate(
    //   ['/details'],
    //   { queryParams: { name: this.validateForm.getRawValue().name } }
    // );
  }

}
