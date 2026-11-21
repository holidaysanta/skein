import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListHeaderComponent } from './note-list-header.component';

describe('NoteListHeaderComponent', () => {
  let component: NoteListHeaderComponent;
  let fixture: ComponentFixture<NoteListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteListHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteListHeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('noteCount', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
