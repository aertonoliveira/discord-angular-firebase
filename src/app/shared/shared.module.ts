import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServidorComponent } from './components/servidor/servidor.component';

const COMPONENTS = [
  ServidorComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  exports: [
    ...COMPONENTS,
  ]
})
export class SharedModule {}
