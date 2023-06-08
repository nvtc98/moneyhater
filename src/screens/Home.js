import React, {useEffect, useState, useRef} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ActivityIndicator} from 'react-native-paper';
import {
  blackColor,
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
import {formatMoney} from '../utils/number';
import FixedHeader from '../components/FixedHeader';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedHeader from '../components/AnimatedHeader';
import Transactions from '../components/Transactions';
import _ from 'lodash';
import {getMonthYearOfDate} from '../utils/date';
import {navigate} from '../utils/navigation';

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  const {getTransactions} = useSheet();
  const [transactions, setTransactions] = useState(null);
  const animatedHeaderRef = useRef(null);

  useEffect(() => {
    const getTransactionList = async () => {
      const transactionList = Object.values(await getTransactions());
      transactionList.reverse();
      setTransactions(transactionList);
    };
    getTransactionList();
  }, []);

  const initialKey = transactions ? _.last(transactions).key : null;

  return (
    <View style={styles.container}>
      <LinearGradient colors={[mainGradientColor3, mainGradientColor1]}>
        <StatusBar
          backgroundColor={mainGradientColor3}
          barStyle={'light-content'}
        />
        <FixedHeader />
        {transactions ? (
          <AnimatedHeader
            ref={animatedHeaderRef}
            initialKey={initialKey}
            transactions={transactions}
          />
        ) : null}
      </LinearGradient>
      {transactions ? (
        <Tab.Navigator
          tabBar={() => null}
          initialRouteName={initialKey}
          screenOptions={{lazy: true}}>
          {transactions.map(item => (
            <Tab.Screen
              key={item.key}
              name={item.key}
              component={Transactions}
              initialParams={item}
              listeners={({navigation, route}) => ({
                focus: () =>
                  animatedHeaderRef.current?.onChangeMonthKey(item.key),
              })}
            />
          ))}
        </Tab.Navigator>
      ) : (
        <ActivityIndicator color={whiteColor} />
      )}
    </View>
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
