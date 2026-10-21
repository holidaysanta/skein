import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListItemComponent } from './note-list-item.component';
import { provideRouter } from '@angular/router';

describe('NoteListItemComponent', () => {
  let component: NoteListItemComponent;
  let fixture: ComponentFixture<NoteListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteListItemComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteListItemComponent);
    fixture.componentRef.setInput('note', { id: '1', title: 'Тест', text: 'Привет' });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
