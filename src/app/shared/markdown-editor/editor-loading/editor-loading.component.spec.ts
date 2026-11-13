import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorLoadingComponent } from './editor-loading.component';

describe('EditorLoadingComponent', () => {
  let component: EditorLoadingComponent;
  let fixture: ComponentFixture<EditorLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
