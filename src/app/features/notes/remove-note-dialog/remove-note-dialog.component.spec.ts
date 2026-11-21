import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveNoteDialogComponent } from './remove-note-dialog.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

describe('RemoveNoteDialogComponent', () => {
  let component: RemoveNoteDialogComponent;
  let fixture: ComponentFixture<RemoveNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveNoteDialogComponent],
      providers: [
        { provide: DIALOG_DATA, useValue: { title: 'Тестовая заметка', action: 'delete' } },
        { provide: DialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
