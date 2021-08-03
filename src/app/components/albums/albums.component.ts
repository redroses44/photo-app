import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Album } from 'src/app/interfaces/Album';
import { AlbumService } from 'src/app/services/album.service';
import {
  CreateAlbumAction,
  RemoveAlbumAction,
  SetSelectedAlbum,
  SetUserAlbumsAction,
} from 'src/app/store/actions/albums.action';
import { SetLoadingAction } from 'src/app/store/actions/loading.action';
import { AddInteractionAction } from 'src/app/store/actions/user-interaction.action';
import { AppState } from 'src/app/store/app-state';
import { getUserAlbums } from 'src/app/store/selectors/albums.selector';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  id: string = '';
  albums: Album[] = [];
  isLoading = true;
  modalOpened = false;
  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private store: Store<AppState>
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
      this.store.pipe(select(getUserAlbums(this.id))).subscribe((state) => {
        this.albums = state;
        this.isLoading = false;
      });
    });
  }

  openModal() {
    this.modalOpened = !this.modalOpened;
  }

  setAlbum(album: Album) {
    this.store.dispatch(new SetSelectedAlbum(album));
  }

  createAlbum() {
    this.albumService.createAlbum(this.title).subscribe((alb) => {
      const album = {
        id: alb.id,
        userId: Number(this.id),
        title: this.title,
      };
      const payload = {
        album,
        userId: this.id,
      };
      this.store.dispatch(new CreateAlbumAction(payload));
      this.store.dispatch(
        new AddInteractionAction({
          type: 'ALBUM_CREATED',
          resource: album,
          userId: this.id,
        })
      );
    });
    this.modalOpened = false;
  }

  removeAlbum(id: number) {
    this.albumService.removeAlbum(id).subscribe((album) => {
      const payload = {
        albumId: id.toString(),
        userId: this.id,
      };
      this.store.dispatch(new RemoveAlbumAction(payload));
      this.store.dispatch(
        new AddInteractionAction({
          type: 'ALBUM_REMOVED',
          userId: this.id,
        })
      );
    });
  }

  ngOnInit(): void {
    if (!this.albums?.length) {
      this.store.dispatch(new SetLoadingAction(true));
      this.albumService.getAlbums(this.id!).subscribe((albums) => {
        this.albums = albums;
        this.isLoading = false;
        const payload = {
          albums,
          userId: this.id,
        };
        this.store.dispatch(new SetUserAlbumsAction(payload));
        this.store.dispatch(new SetLoadingAction(false));
      });
    }
  }
}
