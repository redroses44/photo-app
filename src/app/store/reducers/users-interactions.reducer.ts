import {
  InteractionActions,
  InteractionTypes,
} from '../actions/user-interaction.action';

const initialState: any = [];
export function UserInteractionReducer(
  state = initialState,
  action: InteractionActions
) {
  switch (action.type) {
    case InteractionTypes.ADD_INTERACTION:
      return [...state, action.payload];
    case InteractionTypes.REMOVE_INTERACTIONS:
      return [];
    default:
      return state;
  }
}
