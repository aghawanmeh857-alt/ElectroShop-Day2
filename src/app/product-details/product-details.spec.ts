import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetails } from './product-details';

describe('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('never decreases quantity below one', () => {
    component.decreaseQuantity();
    expect(component.quantity()).toBe(1);
    component.increaseQuantity();
    component.decreaseQuantity();
    component.decreaseQuantity();
    expect(component.quantity()).toBe(1);
  });

  it('sends the product name and selected quantity', () => {
    const emit = vi.spyOn(component.addToCart, 'emit');
    component.increaseQuantity();
    component.addProduct();
    expect(emit).toHaveBeenCalledWith({ name: 'Laptop', quantity: 2 });
  });

  it('does not add an unavailable product', async () => {
    const emit = vi.spyOn(component.addToCart, 'emit');
    fixture.componentRef.setInput('isAvailable', false);
    await fixture.whenStable();
    component.addProduct();
    expect(emit).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.add-button').disabled).toBe(true);
  });
});
