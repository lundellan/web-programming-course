import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from '../movie';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  items: Movie[] = [];
  source = new Subject<Movie[]>();
  movie$ = this.source.asObservable();

  constructor(private http: HttpClient) {
    let movies = window.localStorage.getItem('movies');

    /** Add localStorage to items after reload of page. */
    if (movies !== null) {
      JSON.parse(movies).map((e: Movie) => {
        this.addToWatchlist(e);
      });
    }
  }

  /** Basic Functions for Watchlist */
  addToWatchlist(movie: Movie) {
    window.localStorage.setItem(
      'movies',
      JSON.stringify([...this.items, movie])
    );

    this.items.push(movie);
    this.source.next(this.items);
  }

  removeFromWatchlist(movie: Movie) {
    let idx = this.items.indexOf(movie);
    this.items.splice(idx, 1);
    this.source.next(this.items);

    window.localStorage.setItem('movies', JSON.stringify(this.items));
  }

  getWatchlist() {
    return this.items;
  }

  clearWatchlist() {
    this.items = [];
    this.source.next(this.items);
    window.localStorage.setItem('movies', '[]');
  }
}
