import { faker } from '@faker-js/faker';
import { User } from './types/user.interface';
import { UserWithBadge } from './types/user-with-badge.interface';
import { getUsersBadge } from './badge-helpers';
import { createQueue } from './async-queue';

export const getAllUser = async (): Promise<User[]> => {
  const userCount =  getRandomInt(1000); // Decreased for faster result
  return Array.from(Array(userCount), () => generateUser());
};

const queue = createQueue<UserWithBadge>(20);

export const getAllUsersWithBadge = async (): Promise<ReadonlyArray<UserWithBadge>> => {
  const allUsers = await getAllUser();

  /*
   * Promise.all helps to execute getUsersBadge asynchronously (non-blocking),
   * reducing the overall execution time to that of the longest call.
   *
   * A queue with a concurrency limit has been introduced to prevent
   * resource exhaustion by limiting the number of simultaneous calls.
   * This ensures stable performance even with a large number of tasks.
   */
  return await Promise.all(
    allUsers.map((user) => queue.add(async (): Promise<UserWithBadge> => {
      const badge = await getUsersBadge(user);
      return {
        ...user,
        badge,
      };
    })),
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
