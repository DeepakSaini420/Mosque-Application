import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Mosques{
    id:string,
    name:string,
    location:string,
    Messages:string[],
    Tokens:string[],
    Jummah:string
}

export interface Prayer{
    month:string;
    prayers: any[]
}

interface initialState{
    Mosques: Mosques[];
    selectedMosque: Mosques | null;
    Notifications: any;
    prayers: Prayer[];
    currentMonthPrayers: any[],
    nextMonthPrayer:any
}

const initialState:initialState = {
    Mosques : [] ,
    prayers: [],
    currentMonthPrayers:[],
    selectedMosque:null,
    Notifications:[],
    nextMonthPrayer:null
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
        },
        setNotifications:(state,action:PayloadAction<any[]>)=>{
            state.Notifications = action.payload;
        },
        setNextMonthPrayer:(state,action:PayloadAction<Prayer>)=>{
            state.nextMonthPrayer = action.payload;
        }
    }
});

export const {
    setMosques,
    setPrayers,
    setSelectedMosque,
    setCurrentMonthPrayers,
    setNotifications,
    setNextMonthPrayer
} = mosqueSlice.actions;

export default mosqueSlice.reducer;