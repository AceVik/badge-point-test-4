import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';

const BRONZE_MIN = 5;
const SILVER_MIN = 25;
const GOLD_MIN = 50;

const isBronze = (count: number) => count >= BRONZE_MIN && count < SILVER_MIN;
const isSilver = (count: number) => count >= SILVER_MIN && count < GOLD_MIN;
const isGold = (count: number) => count >= GOLD_MIN;

export const getUsersBadge = (user: User): Icon | null => {
  switch (true) {
    case isBronze(user.solutionCount):
      return Icon.BADGE_BRONZE;

    case isSilver(user.solutionCount):
        return Icon.BADGE_SILVER;

    case isGold(user.solutionCount):
        return Icon.BADGE_GOLD;

    default:
        return null;
    }
};