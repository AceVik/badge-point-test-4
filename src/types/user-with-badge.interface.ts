import { User } from './user.interface';
import { Icon } from './icon.enum';

export interface UserWithBadge extends User {
    badge: Icon | null;
}