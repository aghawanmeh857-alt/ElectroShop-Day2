import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App } from './app';
import { ProductDetails } from './product-details/product-details';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('shows the laptop details and an empty cart', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#product-heading')?.textContent).toBe('Laptop');
    expect(compiled.textContent).toContain('Dell Laptop, Core i7, 16GB RAM');
    expect(compiled.textContent).toContain('$850');
    expect(compiled.textContent).toContain('Your cart is empty');
  });

  it('adds two laptops through the child output and displays $1,700 in the cart', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    page.querySelector<HTMLButtonElement>('[aria-label="Increase quantity"]')!.click();
    await fixture.whenStable();
    page.querySelector<HTMLButtonElement>('.add-button')!.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.cartItems()).toEqual([
      { name: 'Laptop', price: 850, quantity: 2 },
    ]);
    expect(page.querySelector('app-shopping-cart')?.textContent).toContain('$1,700');
    expect(page.querySelector('.cart-message')?.textContent).toContain('2 × Laptop');
  });

  it('reuses the child for headphones and keeps existing cart prices', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const app = fixture.componentInstance;
    const child = fixture.debugElement.query(By.directive(ProductDetails)).componentInstance;
    app.addToCart({ name: 'Laptop', quantity: 2 });
    child.increaseQuantity();
    app.selectProduct('headphones');
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.directive(ProductDetails)).componentInstance).toBe(child);
    expect(child.productName).toBe('Wireless Headphones');
    expect(child.productDescription).toBe('Bluetooth Headphones');
    expect(child.productPrice).toBe(120);
    expect(child.quantity()).toBe(1);
    child.addProduct();
    await fixture.whenStable();

    expect(app.cartItems()).toEqual([
      { name: 'Laptop', price: 850, quantity: 2 },
      { name: 'Wireless Headphones', price: 120, quantity: 1 },
    ]);
    expect(fixture.nativeElement.querySelector('.cart-total').textContent).toContain('$1,820');
  });

  it('combines repeated additions of the same product', () => {
    const app = TestBed.createComponent(App).componentInstance;
    app.addToCart({ name: 'Laptop', quantity: 2 });
    app.addToCart({ name: 'Laptop', quantity: 1 });
    expect(app.cartItems()).toEqual([{ name: 'Laptop', price: 850, quantity: 3 }]);
  });
  it('displays the dynamic product list on the main page', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('app-product-list .product-card')).toHaveLength(8);
  });
});
