import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solution1Component } from './solution1.component';

describe('Solution1Component', () => {
  let component: Solution1Component;
  let fixture: ComponentFixture<Solution1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solution1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solution1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
