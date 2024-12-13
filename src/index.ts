import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';
import { badgeRules } from './badgeRules';

export const getUsersBadge = async (user: User): Promise<Icon | null> => {
    for (const { min, badge } of badgeRules) {
        if (user.solutionCount >= min) return badge;
    }

    return null;
};