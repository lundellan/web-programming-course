import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Movie } from './../movie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieInformationService {
  content = {} as Movie;
  source = new Subject<Movie[]>();
  movie$ = this.source.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  fetchMovie()  {
    let url = this.router.url;
    let urlArray = url.split('/');
    this.getMovieImdb(urlArray[2])
    .subscribe((data: Movie) => {
      this.content = data;
    });
  }

  getMovieImdb(imdb: string) {
    return this.http.get<Movie>(
      'https://www.omdbapi.com/?i=' + imdb + '&plot=full&apikey=e530b6c6'
    );
  }
}
