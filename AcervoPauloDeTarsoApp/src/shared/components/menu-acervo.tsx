import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Menu, HStack, Divider, useTheme, Box } from "native-base";
import { Pressable, Text } from "react-native";
import OptionMenu from "../models/option-menu";
import { useEffect } from "react";

const MenuAcervo = () => {
    const theme = useTheme();
    const menuOptions: OptionMenu[] = [
        { icon: "house", label: "Início" },
        { icon: "book", label: "Livros" },
    ];

    useEffect(() => {
        console.log(menuOptions);

    }, [menuOptions]);

    return (
        <Menu
            shadow={2}
            w="190"
            trigger={triggerProps => {
                return <Pressable {...triggerProps}>
                    <FontAwesomeIcon icon={"bars"} />
                </Pressable>;
            }}>
            {menuOptions.map((option, index) => (
                <Box key={option.label}>
                    {index > 0 && (<Divider />)}
                    <Menu.Item>
                        <HStack style={{ alignItems: "center", justifyContent: "space-between" }}>
                            <FontAwesomeIcon
                                style={{ marginRight: 10, color: theme.colors.secondary[100] }}
                                icon={option.icon}
                            />
                            <Text>{option.label}</Text>
                        </HStack>
                    </Menu.Item>
                </Box>
            ))}
        </Menu>
    )
}

export default MenuAcervo;