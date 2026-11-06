import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoteDialogComponent } from './create-note-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';

describe('CreateNoteDialogComponent', () => {
  let component: CreateNoteDialogComponent;
  let fixture: ComponentFixture<CreateNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNoteDialogComponent],
      providers: [{ provide: DialogRef, useValue: { close: () => {} } }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
