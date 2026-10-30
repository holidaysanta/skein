import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceRailItemComponent } from './space-rail-item.component';
import { provideRouter } from '@angular/router';
import { Space } from '../../../data/space.model';

describe('SpaceRailItemComponent', () => {
  let component: SpaceRailItemComponent;
  let fixture: ComponentFixture<SpaceRailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceRailItemComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceRailItemComponent);
    fixture.componentRef.setInput('space', {
      id: '1',
      name: 'work',
      icon: '💼',
      color: 'blue',
      createdAt: 22.12,
    } satisfies Space);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
