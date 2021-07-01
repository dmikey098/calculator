import { createSlice } from '@reduxjs/toolkit';


export const slice = createSlice({  
  name: 'vibration',  
  initialState: { value: true, },  
  reducers: {    
    setEnabled: (state, action) => { state.value = action.payload },
  },
});

export const { setEnabled } = slice.actions;

export const isEnabled = state => state.vibration.value;

export default slice.reducer;
