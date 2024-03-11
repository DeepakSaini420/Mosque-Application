import { RootState } from "../store";

export const selectMosques = (state:RootState) => state.mosque.Mosques;

export const selectSelectedMosque = (state:RootState) => state.mosque.selectedMosque;

export const selectPrayer = (state:RootState) => state.mosque.prayers;

export const selectCurrentMonthPrayer = (state:RootState) => state.mosque.currentMonthPrayers;

export const selectNotifications = (state:RootState) => state.mosque.Notifications;