import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Album } from '../interfaces/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private url = 'https://jsonplaceholder.typicode.com/albums'

  constructor(private http: HttpClient) { }

  getAlbums(id: string) {
    return this.http.get<Album[]>(`${this.url}?userId=${id}`)
  }
  
  removeAlbum(id: number) {
    return this.http.delete<Album[]>(`${this.url}/${id}`)
  }

  createAlbum(title: string) {
    return this.http.post<Album>(this.url, JSON.stringify({title}))
  }
}
