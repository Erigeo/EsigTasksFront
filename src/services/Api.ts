import axios from "axios";


const getBaseURL = () => {
   
      return 'https://localhost:7281/api/';
  
  };
  
  export const Api = axios.create({
    baseURL: getBaseURL()
  });