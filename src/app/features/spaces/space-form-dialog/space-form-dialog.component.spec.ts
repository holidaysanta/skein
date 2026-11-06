import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceFormDialogComponent } from './space-form-dialog.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

describe('SpaceFormDialogComponent', () => {
  let component: SpaceFormDialogComponent;
  let fixture: ComponentFixture<SpaceFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceFormDialogComponent],
      providers: [
        { provide: DialogRef, useValue: { close: () => {} } },
        { provide: DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
