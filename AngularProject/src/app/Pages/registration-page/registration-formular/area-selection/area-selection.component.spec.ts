import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaSelectionComponent } from './area-selection.component';

describe('AreaSelectionComponent', () => {
  let component: AreaSelectionComponent;
  let fixture: ComponentFixture<AreaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
