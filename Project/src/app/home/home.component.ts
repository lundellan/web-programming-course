import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public homeService: HomeService) {}

  ngOnInit(): void {
    this.fetchTrendingMovies();
  }

  /** Fetches trending movies */
  fetchTrendingMovies() {
    if (this.homeService.content.length === 0)  {
      this.homeService.add('tt10872600');
      this.homeService.add('tt1877830');
      this.homeService.add('tt14992922');
    }
  }

  bigPlot(plot: string) {
    if (plot.length > 200) {
      let temp = plot.substring(0, 200) + '...';
      return temp;
    } else {
      return plot;
    }
  }
}
