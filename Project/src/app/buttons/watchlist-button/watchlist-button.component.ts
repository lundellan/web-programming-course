import { Component, Input } from '@angular/core';
import { Movie } from '../../movie';
import { WatchlistService } from 'src/app/watchlist/watchlist.service';

@Component({
  selector: 'app-watchlist-button',
  template: `
    <button mat-button (click)="handleButton()">
      <mat-icon>{{viewButton('icon')}}</mat-icon>
      {{viewButton('button')}}
    </button>
  `
})
export class WatchlistButtonComponent {
  /* Complains about no initialization, 
   * disabled "strictPropertyInitialization" in tsconfig.json 
   * to be able to pass data to this component without compilation error */
  @Input() movie: Movie;

  constructor(private watchlist: WatchlistService) { }

  handleButton() {
    let watch = this.handleWatch(this.movie);
    if (!watch) {
      this.watchlist.addToWatchlist(this.movie);
    } else {
      this.watchlist.removeFromWatchlist(this.movie);
    }
  }

  viewButton(a: string) {
    let button = this.handleWatch(this.movie);

    if (a === 'button') {
      if (button) {
        return 'Remove from Watchlist';
      }

        return 'Add to Watchlist';
    } else {
      if (button) {
        return 'bookmark';
      }

      return 'bookmark_border';
    }
  }

  handleWatch(movie: Movie) {
    let watch = this.watchlist.getWatchlist().filter((e) => e.imdbID === movie.imdbID);

    return watch.length > 0;
  }

}
