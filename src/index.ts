import './styles/main.css';

import { checkToken } from './modules/auth/auth';
import { readAllUsersToBD } from './modules/auth/api';

checkToken();

readAllUsersToBD('sergey@mail.com');
