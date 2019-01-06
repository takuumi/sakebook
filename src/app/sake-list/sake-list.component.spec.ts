import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SakeListComponent } from './sake-list.component';

describe('SakeListComponent', () => {
  let component: SakeListComponent;
  let fixture: ComponentFixture<SakeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SakeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
