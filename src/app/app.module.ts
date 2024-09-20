import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpAuthInterceptor } from './core/auth/interceptors/http-auth.interceptor';
import { CoreComponents } from './shared/components/export.components';
import { AppModules } from './shared/modules/export.modules';

@NgModule({
  declarations: [
    AppComponent,
    ...CoreComponents
  ],
  imports: [
    ...AppModules
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
