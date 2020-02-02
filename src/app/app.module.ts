import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DichVuComponent } from './dich-vu/dich-vu.component';
import { GioiThieuComponent } from './gioi-thieu/gioi-thieu.component';
import { MultiService } from './multi.service';
import { DialogServiceComponent } from './dich-vu/dialog-service/dialog-service.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";
import { BacSiComponent } from './bac-si/bac-si.component';
import { DialogDoctorComponent } from './bac-si/dialog-doctor/dialog-doctor.component';
import { DialogIntroductionComponent } from './gioi-thieu/dialog-introduction/dialog-introduction.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AuthGuard } from './_guards';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
@NgModule({
  declarations: [
    AppComponent,
    DichVuComponent,
    GioiThieuComponent,
    DialogServiceComponent,
    BacSiComponent,
    DialogDoctorComponent,
    DialogIntroductionComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogServiceComponent,
    DialogDoctorComponent,
    DialogIntroductionComponent
  ],
  providers: [
    MultiService,
    AuthGuard,
    UserService,
    AuthenticationService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr'}},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
