import { configureStore } from '@reduxjs/toolkit'
import initSubscriber from 'redux-subscriber';
import test from "./taxRateSlice"
import counterReducer from './counterSlice'
import vibrationReducer from './vibrationSlice'

const store = configureStore({  
  reducer: {
    counter: counterReducer, 
    taxRate: test,
    vibration: vibrationReducer,
  },
})


const subscribe = initSubscriber(store);

export { subscribe }
export default store
