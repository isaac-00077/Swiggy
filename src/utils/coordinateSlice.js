import { createSlice } from "@reduxjs/toolkit";

const coordinateSlice=createSlice({
    name:"coordinateSlice",
    initialState:{
        place_coordinates:{ lat: 19.0759837, lng: 72.8776559 }
    },
    reducers:{
        setCoordinates:(state,action)=>{
            state.place_coordinates=action.payload
        }
    }
})

export const {setCoordinates}=coordinateSlice.actions
export default coordinateSlice.reducer