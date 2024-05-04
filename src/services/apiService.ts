import axios from 'axios';

const getData = (requestUrl: string) => axios.get(requestUrl);

export default {
  getData
};
