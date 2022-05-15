import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './../environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        CommonModule,
        IonicModule.forRoot(
            {
                mode: 'ios',
                backButtonIcon: 'arrow-back-outline',
                backButtonText: ''
            }
        ),
        AppRoutingModule,
        HttpClientModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
        FormsModule,
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        ComponentsModule
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
