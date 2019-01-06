import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SakeDataComponent } from './sake-data.component';

describe('SakeDataComponent', () => {
  let component: SakeDataComponent;
  let fixture: ComponentFixture<SakeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SakeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SakeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
