import {classSchoolService} from "../services/classSchool.service.js";

export function getAllClasses() {
    return dispatch => {
        dispatch(getAllClassesBegin());
        classSchoolService.getAllClasses()
            .then(classes => {
                dispatch(getAllClassesSuccess(classes))
            }, error => {
                dispatch(getAllClassesFailure(error))
            })
    }
}

export const GET_ALL_CLASSES_BEGIN = "GET_ALL_CLASSES_BEGIN";
export const GET_ALL_CLASSES_SUCCESS = "GET_ALL_CLASSES_SUCCESS";
export const GET_ALL_CLASSES_FAILURE = "GET_ALL_CLASSES_FAILURE";