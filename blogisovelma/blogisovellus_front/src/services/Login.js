import axios from 'axios';

const baseUrl = 'http://localhost:3003/api';
const loginUrl = `${baseUrl}/login`;

async function login(credentials) {
  return await axios.post(loginUrl, credentials);
}

export default login;