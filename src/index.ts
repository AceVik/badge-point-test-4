import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';
import { isBadAss, isBronze, isGodLike, isGold, isPlatinum, isSilver, isStarter } from './badge-helpers';

export const getUsersBadge = async (user: User): Promise<Icon | null> => {
    switch (true) {
        case isStarter(user.solutionCount):
            return Icon.BADGE_STARTER;
        case isBronze(user.solutionCount):
            return Icon.BADGE_BRONZE;
        case isSilver(user.solutionCount):
            return Icon.BADGE_SILVER;
        case isGold(user.solutionCount):
            return Icon.BADGE_GOLD;
        case isPlatinum(user.solutionCount):
            return Icon.BADGE_PLATINUM;
        case isGodLike(user.solutionCount):
            return Icon.BADGE_GOD_LIKE;

        case isBadAss(user.solutionCount):
            return Icon.BADGE_BAD_ASS;

        default:
            return null;
    }
};