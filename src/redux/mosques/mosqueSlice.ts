import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Mosques{
    id:string,
    name:string,
    location:string,
    Messages:string[],
    Tokens:string[]
}

export interface Prayer{
    month:string;
    prayers: any[]
}

interface initialState{
    Mosques: Mosques[];
    selectedMosque: Mosques | null;
    prayers: Prayer[],
    currentMonthPrayers: any[]
}

const initialState:initialState = {
    Mosques : [] ,
    prayers: [],
    currentMonthPrayers:[],
    selectedMosque:null
}

export const mosqueSlice = createSlice({
    name:'mosque',
    initialState,
    reducers:{
        setMosques:(state,action: PayloadAction<Mosques[]>) =>{
            state.Mosques = action.payload;
        },
        setSelectedMosque:(state,action: PayloadAction<Mosques>)=>{
            state.selectedMosque = action.payload;
        },
        setPrayers:(state,action:PayloadAction<Prayer[]>)=>{
            state.prayers = action.payload
        },
        setCurrentMonthPrayers:(state,action:PayloadAction<any[]>)=>{
            console.log(action.payload);
            state.currentMonthPrayers = action.payload;
        }
    }
});

export const {
    setMosques,
    setPrayers,
    setSelectedMosque,
    setCurrentMonthPrayers
} = mosqueSlice.actions;

export default mosqueSlice.reducer;