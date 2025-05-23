import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryPageComponent } from './memory-page.component';

describe('MemoryPageComponent', () => {
  let component: MemoryPageComponent;
  let fixture: ComponentFixture<MemoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
