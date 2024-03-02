import {createSlice,configureStore} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState:{
        isLogin: false,
        userData: null
    },
    reducers:{
        login: (state,action) => {
            state.isLogin = true
            state.userData = action.payload.userData
        },
        logout: (state)=> {
            state.isLogin = false,
            state.userData = null
        }
    }
})

export const authActions = authSlice.actions

export const store =  configureStore({
    reducer: authSlice.reducer
})