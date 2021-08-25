import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {TrendingStackNavigation, FavoritesStackNavigation} from './StackNavigations';

const Tab = createBottomTabNavigator();

const Routes: React.FC = () => {
    return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = 'star';
    
                if (route.name === 'Trending') {
                  iconName = 'trending-up';
                } else if (route.name === 'Favoritos') {
                  iconName = 'star';
                }
    
                return <Icon name={iconName} size={20} color={color} />;
              },
              tabBarStyle: {paddingBottom: 5},
              headerShown: false,
            })}
          >
            <Tab.Screen name="Trending" component={TrendingStackNavigation} />
            <Tab.Screen name="Favoritos" component={FavoritesStackNavigation} />
          </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Routes;