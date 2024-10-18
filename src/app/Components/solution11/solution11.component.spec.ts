import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solution11Component } from './solution11.component';

describe('Solution11Component', () => {
  let component: Solution11Component;
  let fixture: ComponentFixture<Solution11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solution11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solution11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
