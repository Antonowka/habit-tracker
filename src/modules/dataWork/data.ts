import { readAllUsersToBD } from '../auth/api';
import { returnTokenName, returnToken, saveTokenAndName } from '../auth/token';

// export async function createBodyData() {
//     const token = returnToken();
//     const nameUser = returnTokenName();
//     const body = { name: 'John' };
//     if (token && nameUser) {
//         await readAllUsersToBD(nameUser).then((user) => saveTokenAndName('body', JSON.stringify(user)));
//     }
//     return body;
// }
