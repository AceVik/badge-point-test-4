import { User } from '../types/user.interface';
import { UserWithBadge } from '../types/user-with-badge.interface';
import { getUsersBadge } from '../badge-helpers';

export const getUserMock = (count: number): User => {
  return {
    id: '___',
    username: '___',
    solutionCount: count,
  };
};

export const getUserMockWithBadge = async (count: number): Promise<UserWithBadge> => {
  const user = getUserMock(count);
  return {
    ...user,
    badge: await getUsersBadge(user),
  };
};