import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {

  constructor(public searchService: SearchService) {}

  onSearch(url: string) {
    this.searchService.add(url);
  }
}
