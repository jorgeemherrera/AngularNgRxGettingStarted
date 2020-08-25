import { Injectable } from '@angular/core';
import { ProductService } from './../product.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import * as ProductActions from './product.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService){}

    loadProducts$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ProductActions.LoadProducts),
        mergeMap(() => this.productService.getProducts().pipe(
          map(products => ProductActions.LoadProductSuccess({ products })),
          catchError(error => of(ProductActions.LoadProductFailure({error})))
        ))
      )
    })
}
