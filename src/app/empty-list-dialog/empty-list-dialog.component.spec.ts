import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListDialogComponent } from './empty-list-dialog.component';

describe('EmptyListDialogComponent', () => {
  let component: EmptyListDialogComponent;
  let fixture: ComponentFixture<EmptyListDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyListDialogComponent]
    });
    fixture = TestBed.createComponent(EmptyListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
