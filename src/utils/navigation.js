// NOTE: not in use

import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  console.log('navigationRef.isReady()', navigationRef.isReady());
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function pop() {
  console.log('navigationRef.isReady()', navigationRef.isReady());
  // console.log(navigationRef.isReady(), navigationRef.canGoBack());
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
