import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solution8Component } from './solution8.component';

describe('Solution8Component', () => {
  let component: Solution8Component;
  let fixture: ComponentFixture<Solution8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solution8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solution8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
