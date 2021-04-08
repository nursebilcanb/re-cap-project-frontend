import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMenuComponent } from './auth-menu.component';

describe('AuthMenuComponent', () => {
  let component: AuthMenuComponent;
  let fixture: ComponentFixture<AuthMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
