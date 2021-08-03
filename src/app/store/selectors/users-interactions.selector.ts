import { InteractionType } from '../actions/user-interaction.action';
import { AppState } from '../app-state';
import { getUserById } from './users.selector';

export const getUserInteractions = (state: AppState) => {
  return state.userInteractions.map((userInteraction) => {
    const userData = getUserById(Number(userInteraction.userId))(state);
    return {
      ...userInteraction,
      userData,
    };
  });
};

export const getUserInteractionsCountByType =
  (t: InteractionType) => (state: AppState) =>
    getUserInteractions(state).filter(({ type }) => type === t).length;
