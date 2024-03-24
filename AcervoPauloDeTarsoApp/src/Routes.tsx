import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Book from "./features/book/book";
import Home from "./features/home/home";
import { Avatar, HStack, IconButton, useTheme } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Drawer = createDrawerNavigator();

const Routes = () => {
    const appTheme = useTheme();

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen
                    options={{
                        headerRight: () => <IconButton
                            size={"sm"}
                            onPress={() => console.log("hello world")}>
                            <HStack>
                                <FontAwesomeIcon icon={"right-to-bracket"} />
                            </HStack>
                        </IconButton>,
                        headerStyle: { backgroundColor: appTheme.colors.primary[900] },
                        title: "Início",
                    }}
                    name="Home"
                    component={Home} />
                <Drawer.Screen
                    options={{
                        headerRight: () => <IconButton
                            size={"sm"}
                            onPress={() => console.log("hello world")}>
                            <HStack>
                                <FontAwesomeIcon icon={"right-to-bracket"} />
                            </HStack>
                        </IconButton>,
                        headerStyle: { backgroundColor: appTheme.colors.primary[900] },
                        title: "Livros",
                    }}
                    name="Book"
                    component={Book} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Routes;