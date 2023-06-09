import {
  FeedbackFormComponent,
  FeedbackFormDialog,
} from './feedback-form/feedback-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { FountainDescriptionComponent } from './fountain-description/fountain-description.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { SearchPaneComponent } from './search-pane/search-pane.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    SearchPaneComponent,
    FeedbackFormComponent,
    FeedbackFormDialog,
    FountainDescriptionComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    MatListModule,
    MatRippleModule,
    LeafletMarkerClusterModule,
    NgClickOutsideDirective,
  ],
  providers: [HttpClientModule, MatSnackBar],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
