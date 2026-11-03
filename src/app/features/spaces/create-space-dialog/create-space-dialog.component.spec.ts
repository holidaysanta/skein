import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpaceDialogComponent } from './create-space-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';

describe('CreateSpaceDialogComponent', () => {
  let component: CreateSpaceDialogComponent;
  let fixture: ComponentFixture<CreateSpaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSpaceDialogComponent],
      providers: [{ provide: DialogRef, useValue: { close: () => {} } }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSpaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
