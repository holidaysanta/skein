import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotePlaceholderComponent } from './note-placeholder.component';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { signal } from '@angular/core';

describe('NotePlaceholderComponent', () => {
  let component: NotePlaceholderComponent;
  let fixture: ComponentFixture<NotePlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotePlaceholderComponent],
      providers: [{ provide: ROUTER_OUTLET_DATA, useValue: signal(0) }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
