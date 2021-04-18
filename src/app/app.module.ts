import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './layouts/components/components.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatSliderModule } from '@angular/material/slider';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './services/toast.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SwitchScreensComponent } from './layouts/switch-screens/switch-screens.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbdModalOptions } from './modal-options';

@NgModule({
  imports: [
    MatSliderModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MaterialFileInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    ComponentsModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SwitchScreensComponent,
  ],
  providers: [
    MatDatepickerModule,ToastService,AuthService,AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
