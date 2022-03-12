import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Movie } from './../movie';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  content: Movie[] = [];
  source = new Subject<Movie[]>();
  movie$ = this.source.asObservable();
  
  constructor(private http: HttpClient) { }

  /** Fetches content saved in localStorage and updates the service. */
  localStorageFetch() {
    let lsContent = window.localStorage.getItem('home');

    if (lsContent !== null) {
      JSON.parse(lsContent)
      .map((item: Movie) => this.updateService(item));
    }
  }

  updateService(movie: Movie) {
    window.localStorage.setItem(
      'home',
      JSON.stringify([...this.content, movie])
    );

    this.content.push(movie);
    this.source.next(this.content);
  }

  add(query: string) {
    this.getMovieImdb(query)
    .subscribe((data: Movie) => {
      this.content.push(data);
      // this.updateService(data);
    });
  }

  getMovieImdb(imdb: string) {
    return this.http.get<Movie>(
      'https://www.omdbapi.com/?i=' + imdb + '&plot=full&apikey=e530b6c6'
    );
  }
}
