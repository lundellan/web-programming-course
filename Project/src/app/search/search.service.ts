import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Movie } from './../movie';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  content: Movie[] = [];
  source = new Subject<Movie[]>();
  movie$ = this.source.asObservable();

  constructor(private http: HttpClient) { }

  add(query: string) {
    this.content = [];

    if (query != '') {
      this.getMovieSearch(query)
      .subscribe((data: any) => {
        for (let i = 0; i < data.Search.length; i++) {
          this.content.push(data.Search[i]);
        }
      });
    }
  }

  getMovieSearch(url: string) {
    return this.http.get<Movie>(
      'https://www.omdbapi.com/?s=' + url + '&apikey=e530b6c6'
    );
  }
}
