import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnacasaComponent } from './unacasa.component';

describe('UnacasaComponent', () => {
  let component: UnacasaComponent;
  let fixture: ComponentFixture<UnacasaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnacasaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnacasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
