import { calculateUsersStatistics } from './statistics';

calculateUsersStatistics().then((usersStatistics) => {
  console.log(usersStatistics);
}).catch((err) => {
  console.error(err);
});
