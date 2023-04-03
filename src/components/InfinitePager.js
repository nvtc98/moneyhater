import React, {useRef} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {whiteColor} from '../constants/style';
import _ from 'lodash';

export default ({data, renderItem, onPageChange}) => {
  const contentRef = useRef({
    isReady: false,
  });
  const flatListRef = useRef(null);

  const onScrollEnd = _.debounce(position => {
    if (!contentRef.current.isReady) {
      contentRef.current.isReady = true;
      return;
    }
    const index = position / Dimensions.get('window').width;
    console.log('index', index);
    onPageChange?.(index - 1);
    flatListRef.current?.scrollToIndex({
      animated: false,
      index: 1,
    });
  }, 1);

  return data ? (
    <FlatList
      ref={flatListRef}
      horizontal
      pagingEnabled
      contentContainerStyle={styles.container}
      data={data}
      renderItem={renderItem}
      initialScrollIndex={1}
      nestedScrollEnabled
      onScroll={event => onScrollEnd(event?.nativeEvent?.contentOffset?.x)}
    />
  ) : (
    <ActivityIndicator color={whiteColor} />
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 3,
  },
});
