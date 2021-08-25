import React from 'react';
import { Image} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import logo from '../../assets/images/logo.png';
import Trending from '../pages/Trending';
import Favorites from '../pages/Favorites';
import Repository from '../pages/Repository';

const Stack = createNativeStackNavigator();

export const TrendingStackNavigation: React.FC = () => {
    return (
      <Stack.Navigator
        screenOptions={{
            headerTitleAlign: 'center',
            headerTitle: ()=> <Image style={{width: 50, height: 50 /*, marginTop: 10, marginBottom: 10*/}} source={logo} /> ,
            headerStyle: {
                backgroundColor: '#f5f5f5'
            }
        }}
      >
        <Stack.Screen name="TrendingPage" component={Trending} />
        <Stack.Screen name="Repository" component={Repository} />
      </Stack.Navigator>
    );
}


export const FavoritesStackNavigation: React.FC = () => {
    return (
      <Stack.Navigator
        screenOptions={{
            headerTitleAlign: 'center',
            headerTitle: ()=> <Image style={{width: 50, height: 50 /*, marginTop: 10, marginBottom: 10*/}} source={logo} /> ,
            headerStyle: {
                backgroundColor: '#fff'
            }
        }}
      >
        <Stack.Screen name="FavoritesPage" component={Favorites} />
        <Stack.Screen name="Repository" component={Repository} />
      </Stack.Navigator>
    );
}