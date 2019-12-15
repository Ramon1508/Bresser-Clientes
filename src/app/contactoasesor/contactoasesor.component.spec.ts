import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoasesorComponent } from './contactoasesor.component';

describe('ContactoasesorComponent', () => {
  let component: ContactoasesorComponent;
  let fixture: ComponentFixture<ContactoasesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactoasesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoasesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
