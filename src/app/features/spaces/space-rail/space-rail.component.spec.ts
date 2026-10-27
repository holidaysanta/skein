import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceRailComponent } from './space-rail.component';

describe('SpaceRailComponent', () => {
  let component: SpaceRailComponent;
  let fixture: ComponentFixture<SpaceRailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceRailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceRailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
