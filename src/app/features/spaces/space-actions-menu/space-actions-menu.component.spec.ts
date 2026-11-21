import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceActionsMenuComponent } from './space-actions-menu.component';

describe('SpaceActionsMenuComponent', () => {
  let component: SpaceActionsMenuComponent;
  let fixture: ComponentFixture<SpaceActionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceActionsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceActionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
