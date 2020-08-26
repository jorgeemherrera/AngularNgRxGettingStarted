import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import { State, getCurrentProduct, getShowProductCode, getProducts, getError } from '../state';
import { ProductPageActions } from '../state/actions';
@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }
}
