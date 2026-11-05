import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceBadgeComponent } from './space-badge.component';

describe('SpaceBadgeComponent', () => {
  let component: SpaceBadgeComponent;
  let fixture: ComponentFixture<SpaceBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceBadgeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'messages-square');
    fixture.componentRef.setInput('color', 'blue');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
