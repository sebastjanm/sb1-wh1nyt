import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "../screens/HomeScreen";
import { CarDetailsScreen } from "../screens/CarDetailsScreen";
import { SubscriptionScreen } from "../screens/SubscriptionScreen";
import { Frame } from '@nativescript/core';

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => {
    React.useEffect(() => {
        console.log("MainStack mounted");
    }, []);

    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#3B82F6",
                    },
                    headerTintColor: "white",
                    headerShown: true,
                }}
            >
                <StackNavigator.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "Car Subscription"
                    }}
                />
                <StackNavigator.Screen
                    name="CarDetails"
                    component={CarDetailsScreen}
                    options={{
                        title: "Car Details"
                    }}
                />
                <StackNavigator.Screen
                    name="Subscription"
                    component={SubscriptionScreen}
                    options={{
                        title: "Configure Subscription"
                    }}
                />
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    );
}</content>