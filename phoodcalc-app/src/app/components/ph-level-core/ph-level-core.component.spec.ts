import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhLevelCoreComponent } from './ph-level-core.component';

describe('PhLevelCoreComponent', () => {
  let component: PhLevelCoreComponent;
  let fixture: ComponentFixture<PhLevelCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhLevelCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhLevelCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
