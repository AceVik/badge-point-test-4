import { Icon } from './types/icon.enum';

export const badgeRules = [
    { min: 50, badge: Icon.BADGE_GOLD },
    { min: 25, badge: Icon.BADGE_SILVER },
    { min: 5, badge: Icon.BADGE_BRONZE },
].sort((lhs, rhs) => rhs.min - lhs.min);
