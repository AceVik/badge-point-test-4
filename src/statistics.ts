import { User } from './types/user.interface';
import { UsersStatistics } from './types/users-statistics.interface';
import { getAllUsersWithBadge } from './user-store';
import { Icon } from './types/icon.enum';

const sortUsersBySolutionCountDesc = (lhs: User, rhs: User) => rhs.solutionCount - lhs.solutionCount;
const fifthUserIndex = 4;

export const calculateUsersStatistics = async (): Promise<UsersStatistics> => {
  const allUsers = await getAllUsersWithBadge();

  let totalSolutionCount = 0;
  const givenBadgesCounter: Record<Icon, number> = {
    [Icon.BADGE_STARTER]: 0,
    [Icon.BADGE_BRONZE]: 0,
    [Icon.BADGE_SILVER]: 0,
    [Icon.BADGE_GOLD]: 0,
    [Icon.BADGE_PLATINUM]: 0,
    [Icon.BADGE_GOD_LIKE]: 0,
    [Icon.BADGE_BAD_ASS]: 0,
  };

  const topFiveUsers = allUsers.slice(0, 5);
  topFiveUsers.sort(sortUsersBySolutionCountDesc);

  for (let i = 0; i < allUsers.length; i++) {
    const user = allUsers[i];

    totalSolutionCount += user.solutionCount;

    if (i > fifthUserIndex && topFiveUsers[fifthUserIndex].solutionCount < user.solutionCount) {
      topFiveUsers.pop();
      topFiveUsers.push(user);
      topFiveUsers.sort(sortUsersBySolutionCountDesc);
    }

    if (user.badge) givenBadgesCounter[user.badge]++;
  }

  return {
    usersCount: allUsers.length,
    averageSolutionCount: allUsers.length > 0 ?  totalSolutionCount / allUsers.length : 0,
    topFiveUsers,
    mostGivenBadge: Object.entries(givenBadgesCounter).reduce((maxBadge, [badge, count]) => {
      return count > givenBadgesCounter[maxBadge] ? (badge as Icon) : maxBadge;
    }, Object.keys(givenBadgesCounter)[0] as Icon),
  };
};