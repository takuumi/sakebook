import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSakeDataComponent } from './update-sake-data.component';

describe('UpdateSakeDataComponent', () => {
  let component: UpdateSakeDataComponent;
  let fixture: ComponentFixture<UpdateSakeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSakeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSakeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
