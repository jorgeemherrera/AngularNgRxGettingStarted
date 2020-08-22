import { createReducer, on, createAction } from '@ngrx/store';

export const productReducer = createReducer(
  { showProductCode: true },
  on(createAction('[Product] Toogle Product Code'), state => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  })
)