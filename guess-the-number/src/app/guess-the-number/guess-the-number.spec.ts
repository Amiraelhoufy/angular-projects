import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessTheNumber } from './guess-the-number';

describe('GuessTheNumber', () => {
  let component: GuessTheNumber;
  let fixture: ComponentFixture<GuessTheNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessTheNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessTheNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
