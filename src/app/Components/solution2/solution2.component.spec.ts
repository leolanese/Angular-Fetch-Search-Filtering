import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solution2Component } from './solution2.component';

describe('Solution2Component', () => {
  let component: Solution2Component;
  let fixture: ComponentFixture<Solution2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solution2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solution2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
