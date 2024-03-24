import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ITheme,
  NativeBaseProvider,
  extendTheme
} from 'native-base';
import React from 'react';
import Home from './src/features/home/home';
import Book from './src/features/book/book';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Routes from './src/Routes';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

const appTheme: ITheme = extendTheme({
  colors: {
    primary: {
      50: "#a4c8ac",
      100: "#a4c8ac",
      200: "#a4c8ac",
      300: "#a4c8ac",
      400: "#a4c8ac",
      500: "#a4c8ac",
      600: "#a4c8ac",
      700: "#a4c8ac",
      800: "#a4c8ac",
      900: "#a4c8ac"
    },
    secondary: {
      50: "#21c8f6",
      100: "#21c8f6",
      200: "#21c8f6",
      300: "#21c8f6",
      400: "#21c8f6",
      500: "#21c8f6",
      600: "#21c8f6",
      700: "#21c8f6",
      800: "#21c8f6",
      900: "#21c8f6"
    },
    warning: {
      50: "#ff9508",
      100: "#ff9508",
      200: "#ff9508",
      300: "#ff9508",
      400: "#ff9508",
      500: "#ff9508",
      600: "#ff9508",
      700: "#ff9508",
      800: "#ff9508",
      900: "#ff9508"
    },
    success: {
      50: "#8cba44",
      100: "#8cba44",
      200: "#8cba44",
      300: "#8cba44",
      400: "#8cba44",
      500: "#8cba44",
      600: "#8cba44",
      700: "#8cba44",
      800: "#8cba44",
      900: "#8cba44"
    }
  }
})

// const App = () => {
//   // Adiciona pacote de ícones solidos do FontAwesome
//   library.add(fas)

//   return (
//     <NativeBaseProvider theme={appTheme}>
//       <SafeAreaProvider>
//         <StatusBar backgroundColor={"#a4c8ac"}></StatusBar>
//         <Box style={{ height: "10%" }} backgroundColor={"primary.100"}>
//           <HStack style={{ paddingLeft: 8, paddingRight: 8, height: "100%", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
//             <MenuAcervo />

//             <Text>Início</Text>

//             <IconButton
//               size={"sm"}
//               onPress={() => console.log("hello world")}>
//               <HStack>
//                 <FontAwesomeIcon icon={"right-to-bracket"} />
//               </HStack>
//             </IconButton>
//           </HStack>
//         </Box>
//         <Divider backgroundColor={"success.100"}></Divider>

//         {/* Conteúdo */}
//         <Box style={{ height: "100%" }} backgroundColor={"#e8e8e8"}>
//         </Box>
//       </SafeAreaProvider>
//     </NativeBaseProvider>
//   );
// };
const App = () => {
  library.add(fas)
  return (
    <NativeBaseProvider theme={appTheme}>
        <Routes />
    </NativeBaseProvider>
  );
}
export default App;
