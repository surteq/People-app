import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import ScreenOne from './screens/ScreenOne/ScreenOne';
import ScreenOne_test from './screens/ScreenOne/ScreenOne_test';
import ScreenTwo from './screens/ScreenTwo';
import ScreenThree from './screens/ScreenThree';

const Tab = createBottomTabNavigator();

const App = () => {
   

  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Users" 
          component={ScreenOne_test}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" size={size} color={color} />
            ),
          }} 
           />
        <Tab.Screen 
          name="Posts" 
          component={ScreenTwo} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-list" size={size} color={color} />
            ),
        }}
        />
        <Tab.Screen 
        name="Search" 
        component={ScreenThree} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;