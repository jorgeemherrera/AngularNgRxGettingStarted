import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { Store } from '@ngrx/store';
import { State, getCurrentProduct, getShowProductCode, getError } from '../state/product.reducer';

import * as ProductActions from '../state/product.actions';
import { getProducts } from './../state/product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    //TODO: Unsubscribe
    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.store.dispatch(ProductActions.loadProducts());


    //TODO: Unsubscribe
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
