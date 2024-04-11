import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solution4Component } from './solution4.component';

describe('Solution4Component', () => {
  let component: Solution4Component;
  let fixture: ComponentFixture<Solution4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solution4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solution4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
