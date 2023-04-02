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

@NgModule({
  declarations: [
    AppComponent,
    SearchPaneComponent,
    FeedbackFormComponent,
    FeedbackFormDialog,
    FountainDescriptionComponent,
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
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
