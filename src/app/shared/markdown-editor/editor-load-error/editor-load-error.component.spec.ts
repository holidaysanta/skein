import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorLoadErrorComponent } from './editor-load-error.component';

describe('EditorLoadErrorComponent', () => {
  let component: EditorLoadErrorComponent;
  let fixture: ComponentFixture<EditorLoadErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorLoadErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorLoadErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
