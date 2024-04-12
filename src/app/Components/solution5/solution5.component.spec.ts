import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solution5Component } from './solution5.component';

describe('Solution5Component', () => {
  let component: Solution5Component;
  let fixture: ComponentFixture<Solution5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solution5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solution5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
