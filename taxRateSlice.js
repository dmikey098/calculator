import { createSlice } from '@reduxjs/toolkit';


export const slice = createSlice({  
  name: 'taxRate',  
  initialState: { value: '0.09', },  
  reducers: {    
    setRate: (state, action) => { state.value = action.payload },
  },
});

export const { setRate } = slice.actions;

export const selectTaxRate = state => state.taxRate.value;

export default slice.reducer;
