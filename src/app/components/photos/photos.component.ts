import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Photo } from 'src/app/interfaces/Photo';
import { PhotoService } from 'src/app/services/photo.service';
import { SetLoadingAction } from 'src/app/store/actions/loading.action';
import {
  CreatePhotoAction,
  RemovePhotoAction,
  SetUserAlbumPhoto,
} from 'src/app/store/actions/photos.action';
import { AddInteractionAction } from 'src/app/store/actions/user-interaction.action';
import { AppState } from 'src/app/store/app-state';
import { getSelectedAlbum } from 'src/app/store/selectors/albums.selector';
import { getUserPhotos } from 'src/app/store/selectors/photos.selector';
import { getSelectedUser } from 'src/app/store/selectors/users.selector';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  private id = '';
  private userId = '';
  private albumId = '';
  photos: Photo[] = [];
  modalOpened = false;
  url: string = '';

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private location: Location,
    private store: Store<AppState>
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
      this.store.pipe(select(getUserPhotos(this.id))).subscribe((photos) => {
        this.photos = photos;
      });
      this.store.pipe(select(getSelectedUser)).subscribe((user) => {
        if (user) this.userId = user.id.toString();
      });
      this.store.pipe(select(getSelectedAlbum)).subscribe((album) => {
        if (album) this.albumId = album.id.toString();
      });
    });
  }

  goBack() {
    this.location.back();
  }

  openModal() {
    this.modalOpened = !this.modalOpened;
  }

  removeImage(id: number) {
    this.photoService.removePhotoFromAlbum(id).subscribe(() => {
      const payload = {
        albumId: this.albumId,
        photoId: id.toString(),
      };
      this.store.dispatch(new RemovePhotoAction(payload));
      this.store.dispatch(
        new AddInteractionAction({
          type: 'IMAGE_REMOVED',
          userId: this.userId,
        })
      );
    });
  }

  addImage() {
    this.store.dispatch(new SetLoadingAction(true));
    this.photoService.addPhotoToAlbum(this.url).subscribe((photo) => {
      const payload = {
        photo: {
          ...photo,
          thumbnailUrl: this.url,
        },
        albumId: this.albumId,
      };
      this.store.dispatch(new CreatePhotoAction(payload));
      this.store.dispatch(new SetLoadingAction(false));
      this.store.dispatch(
        new AddInteractionAction({
          type: 'IMAGE_CREATED',
          userId: this.userId,
          resource: photo,
        })
      );
    });
  }

  ngOnInit(): void {
    if (!this.photos?.length) {
      this.store.dispatch(new SetLoadingAction(true));
      this.photoService.getAlbumPhotos(this.id!).subscribe((photos) => {
        this.photos = photos;

        const payload = {
          photos,
          userId: this.id,
        };

        this.store.dispatch(new SetUserAlbumPhoto(payload));
        this.store.dispatch(new SetLoadingAction(false));
      });
    }
  }
}
