import axiosInstance from './index'

const axios = axiosInstance

export const getSdps = () => {return axios.get(`http://localhost:8000/test/`)}
export const getComponents = () => {return axios.get(`http://localhost:8000/queryComponents/`)}
export const RegSdp =(formData,array) => {
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
            array.$emit('refresh');
        });
    }
}
export const DelSdp =(sdpid,array) => {
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
            array.loadSdps();
        });
    }
}
export const EditSdp =(formData,array) => {
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
            array.$emit('refresh');
        });
    }
}

//export const postBook = (bookName, bookAuthor) => {return axios.post(`http://localhost:8000/api/books/`, {'name': bookName, 'author': bookAuthor})}