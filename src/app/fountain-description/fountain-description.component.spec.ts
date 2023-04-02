import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FountainDescriptionComponent } from './fountain-description.component';

describe('FountainDescriptionComponent', () => {
  let component: FountainDescriptionComponent;
  let fixture: ComponentFixture<FountainDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FountainDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FountainDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
