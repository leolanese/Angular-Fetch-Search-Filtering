import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solution10Component } from './solution10.component';

describe('Solution9Component', () => {
  let component: Solution10Component;
  let fixture: ComponentFixture<Solution10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solution10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solution10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
