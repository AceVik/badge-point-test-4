import { faker } from '@faker-js/faker';
import { User } from './types/user.interface';
import { UserWithBadge } from './types/user-with-badge.interface';
import { getUsersBadge } from './badge-helpers';

export const getAllUser = async (): Promise<User[]> => {
  const userCount =  getRandomInt(5000);
  return Array.from(Array(userCount), () => generateUser());
};

export const getAllUsersWithBadge = async (): Promise<ReadonlyArray<UserWithBadge>> => {
  const allUsers = await getAllUser();

  /*
   * Promise.all helps to execute getUsersBadge asynchronously (non-blocking),
   * reducing the overall execution time to that of the longest call.
   */
  return await Promise.all(
    allUsers.map(async (user) => {
      const badge = await getUsersBadge(user);
      return {
        ...user,
        badge,
      };
    }),
  );
};

const generateUser = (): User => {
  return {
    id: faker.string.uuid(),
    username: faker.person.fullName(),
    solutionCount: getRandomInt(2200),
  };
};

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};
