import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';

export const BAD_ASS_MAX = -1;
export const STARTER_MIN = 1;
export const BRONZE_MIN = 5;
export const SILVER_MIN = 25;
export const GOLD_MIN = 50;
export const PLATINUM_MIN = 100;
export const GOD_LIKE_MIN = 2001;

export const isBadAss = (count: number) => count <= BAD_ASS_MAX;
export const isStarter = (count: number) => count >= STARTER_MIN && count < BRONZE_MIN;
export const isBronze = (count: number) => count >= BRONZE_MIN && count < SILVER_MIN;
export const isSilver = (count: number) => count >= SILVER_MIN && count < GOLD_MIN;
export const isGold = (count: number) => count >= GOLD_MIN && count < PLATINUM_MIN;
export const isPlatinum = (count: number) => count >= PLATINUM_MIN && count < GOD_LIKE_MIN;
export const isGodLike = (count: number) => count >= GOD_LIKE_MIN;

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