import React from 'react';
import {
  Dimensions,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  borderRadiusNormal,
  darkWhiteColor,
  fontSizeVeryLarge,
  greenColor,
  mainGradientColor1,
  redColor,
  spacingNormal,
  spacingSmall,
  whiteColor,
} from '../constants/style';
import {formatMoney} from '../utils/number';

export default function Transactions(props) {
  const {
    route: {
      params: {key, data},
    },
    navigation,
  } = props;

  const onPressItem = item => {
    navigation.push('Details', {data: item});
  };

  const renderItem = ({item, index, section}) => {
    const {Category, Amount, Note} = item;
    const isFirstItem = !index;
    const isLastItem = index === section.data.length - 1;
    return (
      <TouchableOpacity onPress={() => onPressItem(item)}>
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
      </TouchableOpacity>
    );
  };

  return data ? (
    <View style={styles.backgroundContainer}>
      <SectionList
        sections={data}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        renderSectionHeader={({section: {date}}) => (
          <Text style={styles.sectionHeader}>{date}</Text>
        )}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(sectionItem, index) => sectionItem?.Id || index}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: mainGradientColor1,
    flex: 1,
  },
  container: {
    backgroundColor: darkWhiteColor,
    borderTopLeftRadius: borderRadiusNormal,
    borderTopRightRadius: borderRadiusNormal,
    marginHorizontal: spacingSmall,
    flex: 1,
  },
  contentContainer: {
    padding: spacingNormal,
    width: Dimensions.get('window').width - spacingSmall * 2,
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
    marginRight: spacingSmall,
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
