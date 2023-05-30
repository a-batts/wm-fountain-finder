import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  constructor(public dialog: MatDialog) {}
  openFeedbackForm(): void {
    this.dialog.open(FeedbackFormDialog);
  }
}

@Component({
  selector: 'feedback-dialog',
  templateUrl: 'feedback-dialog.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormDialog {
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  messageFormControl = new FormControl('', [Validators.required]);

  matcher: FormStateMatcher = new FormStateMatcher();
}

/** Error when invalid control is dirty, touched, or submitted. */
export class FormStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted: boolean | null = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
