import axiosInstance from './index'

const axios = axiosInstance

export const getSdps = () => {return axios.get(`http://localhost:8000/test`)}

//export const postBook = (bookName, bookAuthor) => {return axios.post(`http://localhost:8000/api/books/`, {'name': bookName, 'author': bookAuthor})}