import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserInteraction } from 'src/app/interfaces/UserInteraction';
import { ClearInteractionAction } from 'src/app/store/actions/user-interaction.action';
import { AppState } from 'src/app/store/app-state';
import {
  getUserInteractions,
  getUserInteractionsCountByType,
} from 'src/app/store/selectors/users-interactions.selector';

@Component({
  selector: 'app-user-interactions',
  templateUrl: './user-interactions.component.html',
  styleUrls: ['./user-interactions.component.scss'],
})
export class UserInteractionsComponent implements OnInit {
  shouldShow = false;
  interactions: UserInteraction[] = [];
  albumsCreated = 0;
  albumsRemoved = 0;
  photosCreated = 0;
  photosRemoved = 0;

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(getUserInteractions)).subscribe((interactions) => {
      this.interactions = interactions;
    });
    this.store
      .pipe(select(getUserInteractionsCountByType('ALBUM_CREATED')))
      .subscribe((count) => {
        this.albumsCreated = count;
      });
    this.store
      .pipe(select(getUserInteractionsCountByType('ALBUM_REMOVED')))
      .subscribe((count) => {
        this.albumsRemoved = count;
      });
    this.store
      .pipe(select(getUserInteractionsCountByType('IMAGE_CREATED')))
      .subscribe((count) => {
        this.photosCreated = count;
      });
    this.store
      .pipe(select(getUserInteractionsCountByType('IMAGE_REMOVED')))
      .subscribe((count) => {
        this.photosRemoved = count;
      });
  }

  clearInteractions() {
    this.store.dispatch(new ClearInteractionAction());
  }

  toggleShow() {
    this.shouldShow = !this.shouldShow;
  }

  ngOnInit(): void {}
}
