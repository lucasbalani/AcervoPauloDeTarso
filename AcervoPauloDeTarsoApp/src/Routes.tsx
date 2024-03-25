import { NavigationContainer } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import Book from "./features/book/book";
import Home from "./features/home/home";
import { Avatar, HStack, IconButton, useTheme } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";

const CustomDrawerContent = (props: any) => {
    const { navigation, state, descriptors } = props;
    const appTheme = useTheme();

    const getIconByRouteName = (routeName: string) => {
        switch (routeName) {
            case "Home":
                return <FontAwesomeIcon color={appTheme.colors.secondary[900]} icon={"house"} />
            case "Book":
                return <FontAwesomeIcon color={appTheme.colors.secondary[900]} icon={"book"} />
        }
    }

    return (
        <DrawerContentScrollView {...props}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label = options.title !== undefined ? options.title : route.name;
                return (
                    <DrawerItem
                        key={index}
                        label={label}
                        onPress={() => navigation.navigate(route.name)}
                        icon={() => getIconByRouteName(route.name)}
                    />
                );
            })}
        </DrawerContentScrollView>
    );
};

const Drawer = createDrawerNavigator();

const Routes = () => {
    const appTheme = useTheme();
    const navigationTheme = {
        dark: false,
        colors: {
            primary: appTheme.colors.primary[900],
            background: '#e3e4e6',
            card: 'rgb(255, 255, 255)',
            text: 'rgb(28, 28, 30)',
            border: 'rgb(199, 199, 204)',
            notification: 'rgb(255, 69, 58)',
        },
    };


    return (
        <NavigationContainer theme={navigationTheme}>
            <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen

                    name="Home"
                    component={Home}
                    options={{
                        headerRight: () => <IconButton
                            size={"sm"}
                            onPress={() => console.log("logout")}>
                            <HStack>
                                <FontAwesomeIcon icon={"right-to-bracket"} />
                            </HStack>
                        </IconButton>,
                        headerStyle: { backgroundColor: appTheme.colors.primary[900] },
                        title: "Início",
                    }}
                />
                <Drawer.Screen
                    name="Book"
                    component={Book}
                    options={{
                        headerRight: () => <IconButton
                            size={"sm"}
                            onPress={() => console.log("logout")}>
                            <HStack>
                                <FontAwesomeIcon icon={"right-to-bracket"} />
                            </HStack>
                        </IconButton>,
                        headerStyle: { backgroundColor: appTheme.colors.primary[900] },
                        title: "Livros",
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Routes;