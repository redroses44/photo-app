import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../interfaces/Photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private url = 'https://jsonplaceholder.typicode.com/albums/';
  private photoUrl = 'https://jsonplaceholder.typicode.com/photos/';

  constructor(private http: HttpClient) {}

  getAlbumPhotos(albumId: string) {
    return this.http.get<Photo[]>(`${this.url}${albumId}/photos`);
  }

  removePhotoFromAlbum(photoId: number) {
    return this.http.delete<Photo>(`${this.photoUrl}${photoId}`);
  }

  addPhotoToAlbum(url: string) {
    return this.http.post<Photo>(`${this.url}`, { url });
  }
}
