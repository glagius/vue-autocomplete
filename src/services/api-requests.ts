import { UserInfo } from '@/models';
import axios from 'axios';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';

export default (url = usersUrl): Promise<UserInfo> => axios.get(url);
