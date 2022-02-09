import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronographComponent } from './chronograph.component';

describe('ChronographComponent', () => {
  let component: ChronographComponent;
  let fixture: ComponentFixture<ChronographComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronographComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
