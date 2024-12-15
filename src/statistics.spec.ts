import { calculateUsersStatistics } from './statistics';
import { getAllUsersWithBadge } from './user-store';
import { getUserMockWithBadge } from './test-helpers/user-helpers';

jest.mock('./user-store');

const getAllUsersWithBadgeMock = getAllUsersWithBadge as jest.Mock;

describe('calculateUsersStatistics', () => {
  beforeEach(() => {
    getAllUsersWithBadgeMock.mockClear();
  });

  it('should calculate statistics for zero users', async function () {
    getAllUsersWithBadgeMock.mockResolvedValue([]);
    const usersStatistics = await calculateUsersStatistics();
    expect(usersStatistics).toMatchSnapshot();
  });

  it('should calculate statistics for one user', async function () {
    getAllUsersWithBadgeMock.mockResolvedValue([
      await getUserMockWithBadge(55),
    ]);
    const usersStatistics = await calculateUsersStatistics();
    expect(usersStatistics).toMatchSnapshot();
  });

  it('should calculate statistics for five users', async function () {
    getAllUsersWithBadgeMock.mockResolvedValue([
      await getUserMockWithBadge(55),
      await getUserMockWithBadge(4),
      await getUserMockWithBadge(5000),
      await getUserMockWithBadge(4500),
      await getUserMockWithBadge(1400),
    ]);
    const usersStatistics = await calculateUsersStatistics();
    expect(usersStatistics).toMatchSnapshot();
  });

  it('should calculate statistics for more than five users', async function () {
    getAllUsersWithBadgeMock.mockResolvedValue([
      await getUserMockWithBadge(55),
      await getUserMockWithBadge(4),
      await getUserMockWithBadge(5000),
      await getUserMockWithBadge(4500),
      await getUserMockWithBadge(1400),
      await getUserMockWithBadge(2000),
      await getUserMockWithBadge(100),
      await getUserMockWithBadge(1000),
      await getUserMockWithBadge(10000),
      await getUserMockWithBadge(20000),
    ]);
    const usersStatistics = await calculateUsersStatistics();
    expect(usersStatistics).toMatchSnapshot();
  });
});