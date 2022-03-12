import { Component } from '@angular/core';
import { ViewedMoviesService } from './viewed-movies.service';

@Component({
  selector: 'app-viewed-movies',
  templateUrl: './viewed-movies.component.html',
  styleUrls: ['./viewed-movies.component.css']
})
export class ViewedMoviesComponent {
  constructor(public viewedMoviesService: ViewedMoviesService) { }
}
