import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ViewedMoviesService } from '../viewed-movies/viewed-movies.service';
import { Movie } from '../movie';
import { MovieInformationComponent } from '../movie-information/movie-information.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {
  genres: Map<string, number> = new Map();
  actors: Map<string, number> = new Map();

  viewedMovies: Movie[] = [];

  constructor(public viewedMoviesService: ViewedMoviesService) { }

  ngOnInit(): void {
    this.viewedMovies = this.viewedMoviesService.getViewedMovies();

    this.countAll();
  }

  countAll() {
    this.viewedMovies.forEach((movie: Movie) => {
      const array = movie.Actors
      .toString()
      .split(',');

      array.forEach((actor: string) => {
        this.update(this.actors, actor)
      })  
    });  

    this.viewedMovies.forEach((movie: Movie) => {
      const array = movie.Genre
      .toString()
      .split(',');

      array.forEach((genre: string) => {
        this.update(this.genres, genre)
      })  
    }); 
  }

  update(array: Map<string, number>, item: string) {
    if (array.has(item)) {
      const temp = <number>array.get(item);
      array.set(item, temp + 1);
    } else  {
      array.set(item, 1);
    }
  }

}
