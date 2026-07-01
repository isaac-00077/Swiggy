import { createSlice } from "@reduxjs/toolkit";

const toggleSlice=createSlice({
    name:"searchBar",
    initialState:{
        toggleSearchBar:false,
        toggleLogin:false,
        toggleCard:false,
        toggleSimiliarDish:{
            isSimiliarDish:false,
            city:"",
            resId:"",
            resLocation:"",
            itemId:""
        }
    },
    reducers:{
        searchBarToggle: (state) => {
            state.toggleSearchBar = !state.toggleSearchBar;
        },
        loginToggle: (state) => {
            state.toggleLogin = !state.toggleLogin;
        },
        cardToggle: (state, action) => {
            state.toggleCard = action.payload;
        },
        setSimiliarResDish:(state,action)=>{
            state.toggleSimiliarDish=action.payload
        },
        resetSimiliarResDish:(state)=>{
            state.toggleSimiliarDish={
                isSimiliarDish:false,
                city:"",
                resId:"",
                resLocation:"",
                itemId:""
            }
        }

    }
})

export const {searchBarToggle, loginToggle, cardToggle, setSimiliarResDish, resetSimiliarResDish}=toggleSlice.actions
export default toggleSlice.reducer         