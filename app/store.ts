// import { configureStore } from '@reduxjs/toolkit'
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// // import type { RootState, AppDispatch } from './store'
// type DispatchFunc = () => AppDispatch 

// export const store = configureStore({
//   reducer: {
//     posts: postsReducer,
//     comments: commentsReducer,
//     users: usersReducer
//   }
// })

// export const useAppDispatch: DispatchFunc = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch