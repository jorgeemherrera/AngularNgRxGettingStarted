import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const loadProductSuccess = createAction(
  '[Product API] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product API] Load Fail',
  props<{ error: string }>()
);



export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product}>()
);

export const updateProductFailure = createAction(
  '[Product] Update Product Fail',
  props<{ error: string }>()
);