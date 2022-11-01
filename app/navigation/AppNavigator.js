import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import {useState, useEffect} from 'react';
import Add from '../screens/Add';
import { StyleSheet } from 'react-native';
import ContentList from '../screens/ContentList';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function AppNavigator() {
   

  return (
    <Tab.Navigator screenOptions={() => ({
        tabBarActiveTintColor: '#54038a',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
            height: 60,
           paddingBottom: 10,
           backgroundColor: 'tomato'
        },
        headerStyle: {
            backgroundColor: 'tomato',
        },
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 5
          },
        
        
        
    })} >
        <Tab.Screen style={styles.nav} name='Add' component={Add}   options={{
            tabBarIcon: ({color}) => {
                return <FontAwesome name="plus" size={24} color={color}  />
            },
            unmountOnBlur: true
        }}/>
        <Tab.Screen name='Content List' component={ContentList} options={{
            tabBarIcon: ({color}) => {
                return <Foundation name="list" size={24} color={color}  />
            },
            unmountOnBlur: true
            
        }}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    nav: {
        margin: 20,
        color: 'green'
    }
  });