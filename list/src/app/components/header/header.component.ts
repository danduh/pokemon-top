import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import { NzInputDirective, NzInputModule } from 'ng-zorro-antd/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonService } from '../../services/pokemon.service';
import { Observable, tap } from 'rxjs';
import { NamedAPIResource } from 'pokenode-ts';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'pokemon-header',
  standalone: true,
  imports: [CommonModule, FormsModule,
    NzInputDirective, NzSelectComponent, NzOptionComponent, NzFormDirective, NzFormItemComponent,
    NzInputModule, NzFormControlComponent, ReactiveFormsModule, NzFormLabelComponent, NzButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  selectedNameId!:string
  types!: Observable<NamedAPIResource[]>;
  validateForm :FormGroup<{
  type: FormControl<string>;
  name: FormControl<string>;
  ability: FormControl<string>;
}> = this.fb.group({
    type: [''],
    name: [''],
    ability: ['']
})
  constructor(private pokemonService: PokemonService, private fb: NonNullableFormBuilder, private changeDetec: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.types = this.pokemonService.pokemonTypes
    this.pokemonService.loadTypes()
    this.types.pipe(
      tap(()=>this.changeDetec.detectChanges())
    )
    this.validateForm.valueChanges.subscribe(this.formHandle.bind(this))
  }

  formHandle(data: any){
    console.log(data);
    if(!data.type?.name)return
    this.pokemonService.filterByTypeName(data.type.name)
  }

  navigateTo(){
    console.log(this.validateForm.getRawValue().name)
  }
}
