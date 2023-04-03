import React, {useEffect, useState, useRef} from 'react';
import {SectionList, StyleSheet, Text, View, Dimensions} from 'react-native';
import {Searchbar, Card, IconButton, Divider} from 'react-native-paper';
import normalize from 'react-native-normalize';
import {
  borderRadiusNormal,
  darkWhiteColor,
  fontSizeLarge,
  fontSizeVeryLarge,
  greenColor,
  mainGradientColor1,
  mainGradientColor2,
  mainGradientColor3,
  redColor,
  spacingNormal,
  spacingSmall,
  whiteColor,
} from '../constants/style';
import useSheet from '../hooks/useSheet';
import useDate from '../hooks/useDate';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatMoney} from '../utils/number';
import FixedHeader from '../components/FixedHeader';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedHeader from '../components/AnimatedHeader';
import InfinitePager from '../components/InfinitePager';

export default function Home() {
  const {get3MonthsData, addMonth} = useDate();
  console.log('get3MonthsData', get3MonthsData());

  const renderItem = ({item, index, section}) => {
    const {Category, Amount, Note} = item;
    const isFirstItem = !index;
    const isLastItem = index === section.data.length - 1;
    return (
      <View
        style={[
          styles.itemContainer,
          isFirstItem ? styles.firstItemContainer : null,
          isLastItem ? styles.lastItemContainer : null,
        ]}>
        <View style={styles.itemLeftContainer}>
          <Icon name="rocket" size={normalize(30)} />
          <View style={styles.itemLeftTextContainer}>
            <Text style={styles.categoryText}>{Category}</Text>
            <Text>{Note}</Text>
          </View>
        </View>
        <Text style={{color: Amount > 0 ? greenColor : redColor}}>
          {formatMoney(Amount)}
        </Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={{backgroundColor: 'blue', marginHorizontal: -spacingNormal}}>
        <IconButton icon={'chart-box-outline'} />
        <Text style={styles.buttonText}>14,500,000</Text>
        <IconButton icon={'cog-outline'} />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[mainGradientColor3, mainGradientColor1]}
      style={styles.container}>
      <FixedHeader />
      <AnimatedHeader />
      <InfinitePager
        data={get3MonthsData()}
        onPageChange={addMonth}
        renderItem={({item}) =>
          item ? (
            <SectionList
              sections={item}
              stickySectionHeadersEnabled
              renderItem={renderItem}
              renderSectionHeader={({section: {date}}) => (
                <Text style={styles.sectionHeader}>{date}</Text>
              )}
              ItemSeparatorComponent={() => <Divider />}
              keyExtractor={(sectionItem, index) => sectionItem?.Id || index}
              contentContainerStyle={styles.contentContainer}
            />
          ) : null
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: darkWhiteColor,
    paddingHorizontal: spacingNormal,
    borderTopLeftRadius: borderRadiusNormal,
    borderTopRightRadius: borderRadiusNormal,
    marginTop: 100,
    width: Dimensions.get('window').width - spacingSmall * 2,
    marginHorizontal: spacingSmall,
  },
  sectionHeader: {
    fontSize: fontSizeVeryLarge,
  },
  itemContainer: {
    backgroundColor: whiteColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacingNormal,
    alignItems: 'center',
  },
  itemLeftContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  itemLeftTextContainer: {
    flex: 1,
    marginLeft: spacingNormal,
  },
  firstItemContainer: {
    borderTopLeftRadius: borderRadiusNormal,
    borderTopRightRadius: borderRadiusNormal,
  },
  lastItemContainer: {
    borderBottomLeftRadius: borderRadiusNormal,
    borderBottomRightRadius: borderRadiusNormal,
  },
  categoryText: {
    fontWeight: 'bold',
  },
});
