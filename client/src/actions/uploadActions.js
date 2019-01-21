import { uploadService } from '../services/upload.service';

export function addNewUpload(upload){
    console.log('add new upload',upload);
    return dispatch => {
        dispatch(addNewUploadBegin());
        uploadService.addNewUpload(upload)
            .then(upload => {
                console.log('upload i receive in action', upload)
                dispatch(addNewUploadSuccess(upload))
            }, error => {
                dispatch(addNewUploadFailure(error))
            })
    }
}


export const ADD_NEW_UPLOAD_BEGIN = "ADD_NEW_UPLOAD_BEGIN";
export const ADD_NEW_UPLOAD_SUCCESS = "ADD_NEW_UPLOAD_SUCCESS";
export const ADD_NEW_UPLOAD_FAILURE = "ADD_NEW_UPLOAD_FAILURE";

export const addNewUploadBegin = () => ({
    type: ADD_NEW_UPLOAD_BEGIN
})

export const addNewUploadSuccess = (upload) => ({
    type: ADD_NEW_UPLOAD_SUCCESS,
    payload: { upload }
})

export const addNewUploadFailure = (error) => ({
    type: ADD_NEW_UPLOAD_FAILURE,
    payload: { error }
}) 