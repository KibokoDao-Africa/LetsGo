import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { EventsApi } from './services'


export const store = configureStore({
    reducer:{
        [EventsApi.reducerPath]:EventsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(EventsApi.middleware),
})

setupListeners(store.dispatch)