import { InteractionType } from '../store/actions/user-interaction.action';
import { Album } from './Album';
import { Photo } from './Photo';
import { User } from './User';

export interface UserInteraction {
  type: InteractionType;
  resource: Album | Photo;
  userId: string;
  userData: User | undefined;
}
