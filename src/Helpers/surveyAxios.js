import axios from 'axios';

// let baseURL = "http://localhost:3000/api/";
let baseURL = "https://agile-survey.herokuapp.com/";

const surveyAxios = axios.create({baseURL});

export default surveyAxios;