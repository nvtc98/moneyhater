import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {fontSizeLarge, whiteColor} from '../constants/style';

export default () => {
  return (
    <View style={styles.container}>
      <IconButton icon={'chart-box-outline'} iconColor={whiteColor} />
      <Text style={styles.moneyText}>14,500,000</Text>
      <IconButton icon={'cog-outline'} iconColor={whiteColor} />
    </View>
  );
};

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
});
