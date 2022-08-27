import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://testapp.axreng.com:3000/crawl',
});