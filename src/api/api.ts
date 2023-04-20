import type { Context } from 'vitest'
import axiosInstance from './index'

const axios = axiosInstance

export const getSdps = () => {return axios.get(`http://localhost:8000/querySdps/`)}
export const getLogs = () => {return axios.get(`http://localhost:8000/queryLogs/`)}
export const getComponents = () => {return axios.get(`http://localhost:8000/queryComponents/`)}
export const RegSdp =(formData) => {
    {
        axios({
            method:"post",
            url:"http://localhost:8000/RegSdp/",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials:true,
            data:formData
        }).then((res)=>{
            console.log(res);
        });
    }
}
export const DelSdp =(sdpid) => {
    {
        axios({
            method:"post",
            url:"http://localhost:8000/DelSdp/",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            withCredentials:true,
            data:{
                Delsdpid:sdpid
            }
        }).then((res)=>{
            console.log(res);
        });
    }
}
export const EditSdp =(formData) => {
    {
        axios({
            method:"post",
            url:"http://localhost:8000/EditSdp/",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials:true,
            data:formData
        }).then((res)=>{
            console.log(res);
        });
    }
}

//export const postBook = (bookName, bookAuthor) => {return axios.post(`http://localhost:8000/api/books/`, {'name': bookName, 'author': bookAuthor})}