import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solution6Component } from './solution6.component';

describe('Solution6Component', () => {
  let component: Solution6Component;
  let fixture: ComponentFixture<Solution6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solution6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solution6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
