export const CHANGE_NAVIGATION = 'CHANGE_NAVIGATION';

export function changeNavigationItem(newNavigationItem) {
  return {
    type: CHANGE_NAVIGATION,
    payload: newNavigationItem,
  };
}
