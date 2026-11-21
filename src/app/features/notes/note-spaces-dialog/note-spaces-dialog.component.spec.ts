import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSpacesDialogComponent } from './note-spaces-dialog.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

describe('NoteSpacesDialogComponent', () => {
  let component: NoteSpacesDialogComponent;
  let fixture: ComponentFixture<NoteSpacesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteSpacesDialogComponent],
      providers: [
        { provide: DialogRef, useValue: { close: () => {} } },
        {
          provide: DIALOG_DATA,
          useValue: { title: 'Тестовая заметка', initialSpaceIds: [] },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteSpacesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
