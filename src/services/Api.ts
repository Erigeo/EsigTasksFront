import axios from "axios";


const getBaseURL = () => {
   
      return 'http://192.168.1.133:8080/cardwars/'; // Use your notebook's local IP address
  
  };
  
  const Api = axios.create({
    baseURL: getBaseURL()
  });