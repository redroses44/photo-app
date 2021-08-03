import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './components/albums/albums.component';
import { FormsModule } from '@angular/forms';
import { PhotosComponent } from './components/photos/photos.component';
import { StoreModule } from '@ngrx/store';
import { UsersReducer } from './store/reducers/users.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserInteractionReducer } from './store/reducers/users-interactions.reducer';
import { AlbumsReducer } from './store/reducers/albums.reducer';
import { PhotoReducer } from './store/reducers/photos.reducer';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingReducer } from './store/reducers/loading.reducer';
import { UserInteractionsComponent } from './components/user-interactions/user-interactions.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'albums/:id',
    component: AlbumsComponent,
  },
  {
    path: 'photos/:id',
    component: PhotosComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    AlbumsComponent,
    PhotosComponent,
    SpinnerComponent,
    UserInteractionsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    StoreModule.forRoot({
      //@ts-ignore
      user: UsersReducer,
      //@ts-ignore
      userInteractions: UserInteractionReducer,
      //@ts-ignore
      album: AlbumsReducer,
      //@ts-ignore
      photos: PhotoReducer,
      //@ts-ignore
      loading: LoadingReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
