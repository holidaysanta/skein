import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEmptyComponent } from './note-empty.component';

describe('NoteEmptyComponent', () => {
  let component: NoteEmptyComponent;
  let fixture: ComponentFixture<NoteEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
