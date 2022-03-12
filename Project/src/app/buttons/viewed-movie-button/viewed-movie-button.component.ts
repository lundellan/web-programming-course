import { Component, Input } from '@angular/core';
import { Movie } from '../../movie';
import { ViewedMoviesService } from 'src/app/viewed-movies/viewed-movies.service';

@Component({
  selector: 'app-viewed-movie-button',
  template: `
    <button mat-button (click)="handleButton()">
      <mat-icon>{{viewButton('icon')}}</mat-icon>
      {{viewButton('button')}}
    </button>
  `
})
export class ViewedMovieButtonComponent {
  /* Complains about no initialization, 
   * disabled "strictPropertyInitialization" in tsconfig.json 
   * to be able to pass data to this component without compilation error */
  @Input() movie: Movie;

  constructor(private viewedMoviesService: ViewedMoviesService) { }

  handleButton() {
    let watch = this.handleWatch(this.movie);
    if (!watch) {
      this.viewedMoviesService.addToViewedMovies(this.movie);
    } else {
      this.viewedMoviesService.removeFromViewedMovies(this.movie);
    }
  }

  viewButton(a: string) {
    let button = this.handleWatch(this.movie);

    if (a === 'button') {
      if (button) {
        return 'Remove from Viewed Movies';
      }

        return 'Add to Viewed Movies';
    } else {
      if (button) {
        return 'done';
      }

      return 'add';
    }
  }

  handleWatch(movie: Movie) {
    let watch = this.viewedMoviesService.getViewedMovies().filter((e) => e.imdbID === movie.imdbID);

    return watch.length > 0;
  }

}
