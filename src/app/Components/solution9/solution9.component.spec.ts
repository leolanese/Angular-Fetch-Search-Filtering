import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solution9Component } from './solution9.component';

describe('Solution9Component', () => {
  let component: Solution9Component;
  let fixture: ComponentFixture<Solution9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solution9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solution9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
