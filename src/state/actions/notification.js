
import { DISPLAY_NOTIFICATION, CLEAR_NOTIFICATION } from './types';
import { websiteLink, localhost } from "../config/websitepath";

export const notification = (data) => async (dispatch) => {
    console.log("dispaly notification");
    dispatch({
        type:DISPLAY_NOTIFICATION,
        payload:true
    })
};

export const clearnotification = (data) => async (dispatch) => {
    dispatch({
        type:CLEAR_NOTIFICATION,
        payload:false
    })
};