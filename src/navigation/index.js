import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Main from '../screens/Main'
import CreatNote from '../screens/CreatNote';
import Login from '../screens/Login';
import Signup from '../screens/SignUp'

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    options={{headerShown:false,orientation:'all'}} 
                    name= "SPLASH" component={Splash}
                />
                <Stack.Screen 
                     options={{headerShown:false,orientation:'all'}} 
                    name= "MAIN" component={Main} 
                />
                <Stack.Screen 
                     options={{headerShown:false,orientation:'all'}} 
                    name= "CREATNOTE" component={CreatNote} 
                />
                <Stack.Screen 
                     options={{headerShown:false,orientation:'all'}} 
                    name= "LOGIN" component={Login} 
                />
                <Stack.Screen 
                     options={{headerShown:false,orientation:'all'}} 
                    name= "SIGNUP" component={Signup} 
                />
            </Stack.Navigator>
        </NavigationContainer>
   );
  }

export default Navigation;