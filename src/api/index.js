import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID d2020ca4b1a9bf5c7f06de67f3c8a7de30ab7f1106fa3e068b9110b90bd11202'
  }
})