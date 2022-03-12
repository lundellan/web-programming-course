import { Component, OnInit } from '@angular/core';
import { MovieInformationService } from './movie-information.service';

@Component({
  selector: 'app-movie-information',
  templateUrl: './movie-information.component.html',
  styleUrls: ['./movie-information.component.css'],
})
export class MovieInformationComponent implements OnInit {
  constructor(public movieInformationService: MovieInformationService) {}

  ngOnInit(): void {
    this.movieInformationService.fetchMovie();
  }
}
