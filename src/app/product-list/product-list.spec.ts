import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ProductList } from './product-list';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  function render(): void {
    fixture.debugElement.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
  }

  function cards(): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.product-card'));
  }

  it('displays all eight products and JD prices', () => {
    expect(cards()).toHaveLength(8);
    component.products.forEach((product, index) => {
      expect(cards()[index].textContent).toContain(product.name);
      expect(cards()[index].textContent).toContain(product.price + ' JD');
      expect(cards()[index].querySelector('img')?.getAttribute('src')).toBe(product.image);
    });
  });

  it('shows stock, offer, and Buy Now conditions for each product', () => {
    component.products.forEach((product, index) => {
      const card = cards()[index];
      expect(card.querySelector('.availability')?.textContent?.trim()).toBe(
        product.isAvailable ? 'Available' : 'Out of Stock'
      );
      expect(card.querySelector('.offer')?.textContent).toContain(
        product.discount > 0 ? 'Special Offer' : 'No Discount'
      );
      expect(card.querySelector('button') !== null).toBe(product.isAvailable);
    });
  });

  it('combines CSS classes and applies price styles and opacity', () => {
    const laptop = cards()[0];
    const smartphone = cards()[1];
    const headphones = cards()[2];

    expect(laptop.classList.contains('discount-card')).toBe(true);
    expect(laptop.classList.contains('available-card')).toBe(true);
    expect(laptop.classList.contains('premium-card')).toBe(true);
    expect(laptop.querySelector<HTMLElement>('.price')?.style.color).toBe('red');
    expect(laptop.querySelector<HTMLElement>('.price')?.style.fontSize).toBe('28px');
    expect(smartphone.classList.contains('discount-card')).toBe(false);
    expect(smartphone.querySelector<HTMLElement>('.price')?.style.color).toBe('black');
    expect(smartphone.querySelector<HTMLElement>('.price')?.style.fontSize).toBe('20px');
    expect(headphones.classList.contains('unavailable-card')).toBe(true);
    expect(headphones.style.opacity).toBe('0.8');
  });

  it('updates all card conditions when product data changes', () => {
    component.products[0].isAvailable = false;
    component.products[0].discount = 0;
    component.products[0].price = 500;
    render();

    const laptop = cards()[0];
    expect(laptop.classList.contains('available-card')).toBe(false);
    expect(laptop.classList.contains('discount-card')).toBe(false);
    expect(laptop.classList.contains('premium-card')).toBe(false);
    expect(laptop.querySelector('.premium-label')).toBeNull();
    expect(laptop.querySelector('button')).toBeNull();
    expect(laptop.querySelector<HTMLElement>('.price')?.style.color).toBe('black');

    component.products[0].price = 501;
    render();
    expect(laptop.querySelector('.premium-label')?.textContent).toContain('Premium Product');
    expect(laptop.classList.contains('premium-card')).toBe(true);
  });

  it.each([
    ['Pending', 'Your order is waiting for confirmation.'],
    ['Processing', 'Your order is being prepared.'],
    ['Shipped', 'Your order has been shipped.'],
    ['Delivered', 'Your order has been delivered.'],
    ['Cancelled', 'Unknown Order Status.'],
  ])('displays the message for order status %s', (status, message) => {
    component.orderStatus = status;
    render();
    expect(fixture.nativeElement.querySelector('.order-status p').textContent.trim()).toBe(message);
  });

  it.each([
    ['All Products', 'Explore all the products in ElectroShop.'],
    ['Electronics', 'Discover our laptops, smartphones, tablets, and monitors.'],
    ['Accessories', 'Discover our headphones, smart watches, keyboards, and gaming mice.'],
  ])('changes the %s category message without filtering products', (category, message) => {
    component.selectedCategory = category;
    render();
    expect(fixture.nativeElement.querySelector('.categories').textContent).toContain(message);
    expect(cards()).toHaveLength(8);
  });

  it('shows an alert for the selected available product', () => {
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    cards()[0].querySelector('button')!.click();
    expect(alert).toHaveBeenCalledWith('You selected: Laptop');
    alert.mockRestore();
  });
});
