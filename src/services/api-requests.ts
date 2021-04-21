import { UserInfo } from '@/models';
import axios from 'axios';

export const usersUrl = 'https://jsonplaceholder.typicode.com/users';
export const imagesUrl = 'https://jsonplaceholder.typicode.com/photos';

export const loader = (url: string): Promise<UserInfo[] | string[]> => axios
  .get(url)
  .then((res) => res.data);
