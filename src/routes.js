import React from 'react-native';
import TabBar from './navigation/tab-bar';
import ItemDetailsPage from './components/item-details-page';

export function getTabBar() {
  return {
    getSceneClass() {
      return TabBar;
    },

    getTitle() {
      return 'Home';
    },
  };
}

export function getItemDetailsPage(id) {
  return {
    renderScene(navigator) {
      return (
        <ItemDetailsPage
          navigator={navigator}
          id={id}
        />
      );
    },

    getTitle() {
      return 'Item Details';
    },
  };
}
