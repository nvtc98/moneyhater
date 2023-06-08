import React, {useEffect, useImperativeHandle, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {fontSizeLarge, whiteColor} from '../constants/style';
import {useNavigation} from '@react-navigation/native';
import {getMonthYearOfDate} from '../utils/date';
import _ from 'lodash';

export default React.forwardRef(({initialKey, transactions}, ref) => {
  const navigation = useNavigation();
  const [key, setKey] = useState(initialKey);

  useImperativeHandle(ref, () => ({
    onChangeMonthKey: newKey => {
      setKey(newKey);
    },
  }));

  useEffect(() => {
    setKey(initialKey);
  }, [initialKey]);

  const onChangeMonth = offset => {
    try {
      const currentDate = new Date(key.split('/').reverse().join('/') + '/01');
      console.log('currentDate', currentDate);
      const newKey = getMonthYearOfDate(
        new Date(currentDate.setMonth(currentDate.getMonth() + offset)),
      );
      navigation.navigate(newKey);
    } catch {}
  };

  const isFirst = key === _.first(transactions).key;
  const isLast = key === _.last(transactions).key;

  return (
    <View style={styles.container}>
      <IconButton
        icon={'chevron-left'}
        onPress={() => onChangeMonth(-1)}
        iconColor={whiteColor}
        style={isFirst ? styles.invinsible : null}
        disabled={isFirst}
      />
      <Text style={styles.moneyText}>{key}</Text>
      <IconButton
        icon={'chevron-right'}
        onPress={() => onChangeMonth(1)}
        iconColor={whiteColor}
        style={isLast ? styles.invinsible : null}
        disabled={isLast}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moneyText: {
    color: whiteColor,
    fontWeight: 'bold',
    fontSize: fontSizeLarge,
  },
  invinsible: {
    opacity: 0,
  },
});
