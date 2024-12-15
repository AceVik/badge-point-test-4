import { User } from './user.interface';
import { Icon } from './icon.enum';

export interface UsersStatistics {
    usersCount: number;
    averageSolutionCount: number;
    topFiveUsers: Array<User>;
    mostGivenBadge: Icon;
}