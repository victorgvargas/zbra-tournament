import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentKeysComponent } from './tournament-keys.component';

describe('TournamentKeysComponent', () => {
  let component: TournamentKeysComponent;
  let fixture: ComponentFixture<TournamentKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
