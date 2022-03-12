import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

/** Components for MoviExplorer */
import { SearchComponent } from './search/search.component';
import { MovieInformationComponent } from './movie-information/movie-information.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ViewedMoviesComponent } from './viewed-movies/viewed-movies.component';
import { HomeComponent } from './home/home.component';
import { WatchlistButtonComponent } from './buttons/watchlist-button/watchlist-button.component';
import { ViewedMovieButtonComponent } from './buttons/viewed-movie-button/viewed-movie-button.component';

/** Imported Modules */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MovieInformationComponent,
    WatchlistComponent,
    ViewedMoviesComponent,
    HomeComponent,
    WatchlistButtonComponent,
    ViewedMovieButtonComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
