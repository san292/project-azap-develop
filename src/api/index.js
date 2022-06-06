import axios from 'axios';

// const api_key = '0c0f306539f7e9b203cb170dbc63b634';

const instance = axios.create({ baseURL: 'http://localhost:8000/v1/' });

export default instance;
