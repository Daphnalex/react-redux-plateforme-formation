import {
    ADD_NEW_UPLOAD_BEGIN,
    ADD_NEW_UPLOAD_SUCCESS,
    ADD_NEW_UPLOAD_FAILURE
} from "../actions/uploadActions";

const initialState = {
    loading: false,
    error: null,
    upload: null
}

export default function fetchUploadsReducer(state = initialState, action){
    console.log('action.type in upload reducer',action.type);
    console.log('payload upload reducer',action.payload)
    switch(action.type){
        case ADD_NEW_UPLOAD_BEGIN:
            return {
                ...state,
                loading: true
            }
        case ADD_NEW_UPLOAD_SUCCESS:
            return {
                upload: action.payload.upload,
                loading: false
            }
        case ADD_NEW_UPLOAD_FAILURE: 
            return {
                loading: false,
                error: action.payload.error
            }
        default: 
            return state;
    }
}

