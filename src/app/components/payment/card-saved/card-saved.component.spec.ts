import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSavedComponent } from './card-saved.component';

describe('CardSavedComponent', () => {
  let component: CardSavedComponent;
  let fixture: ComponentFixture<CardSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
