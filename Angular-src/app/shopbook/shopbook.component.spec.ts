import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopbookComponent } from './shopbook.component';

describe('ShopbookComponent', () => {
  let component: ShopbookComponent;
  let fixture: ComponentFixture<ShopbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopbookComponent]
    });
    fixture = TestBed.createComponent(ShopbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
