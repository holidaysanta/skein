import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceRailItemComponent } from './space-rail-item.component';

describe('SpaceRailItemComponent', () => {
  let component: SpaceRailItemComponent;
  let fixture: ComponentFixture<SpaceRailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceRailItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceRailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
