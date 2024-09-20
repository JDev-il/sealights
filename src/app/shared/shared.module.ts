import { NgModule } from '@angular/core';

import { SharedComponents } from './components/export.components';
import { SharedModules } from './modules/export.modules';

@NgModule({
  declarations: [
    ...SharedComponents
  ],
  imports: [
    ...SharedModules
  ],
})
export class SharedModule { }
