import { faker } from '@faker-js/faker';
import { User } from './types/user.interface';
import { UserWithBadge } from './types/user-with-badge.interface';
import { getUsersBadge } from './badge-helpers';

export const getAllUser = async (): Promise<User[]> => {
  const userCount = getRandomInt(5000);
  return Array.from(Array(userCount), () => generateUser());
};

export const getAllUsersWithBadge = async (): Promise<ReadonlyArray<UserWithBadge>> => {
  const usersWithBadge: Array<UserWithBadge> = [];

  for (const user of await getAllUser()) {
    usersWithBadge.push({
      ...user,
      badge: await getUsersBadge(user),
    });
  }

  return usersWithBadge;
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
