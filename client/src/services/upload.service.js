import config from '../config';
import axios from 'axios';

const domain = config.domain;

export const uploadService = {
    addNewUpload
}

function addNewUpload(upload){
    console.log('upload in service',upload)
    const fd = new FormData();
    fd.append('file',upload,upload.name);
    axios.post(`${domain}/uploads`, fd, {
        onUploadProgress: progressEvent => {
            console.log('Upload Progress: '+ (progressEvent.loaded / progressEvent.total * 100) + '%')
        }
    }).then(res => console.log(res))
    .then(upload => {
        return upload
    });
};