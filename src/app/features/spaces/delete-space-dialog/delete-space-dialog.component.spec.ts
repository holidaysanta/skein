import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpaceDialogComponent } from './delete-space-dialog.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

describe('DeleteSpaceDialogComponent', () => {
  let component: DeleteSpaceDialogComponent;
  let fixture: ComponentFixture<DeleteSpaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSpaceDialogComponent],
      providers: [
        { provide: DIALOG_DATA, useValue: { name: 'JavaScript' } },
        { provide: DialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteSpaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
