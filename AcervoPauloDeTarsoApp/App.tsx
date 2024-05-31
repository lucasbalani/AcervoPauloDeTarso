import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  ITheme,
  NativeBaseProvider,
  extendTheme
} from 'native-base';
import React, { useCallback, useEffect } from 'react';
import 'react-native-gesture-handler';
import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import { RecoilRoot } from 'recoil';
import Routes from './src/Routes';

enablePromise(true)

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

const App = () => {

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()

      await createTables(db)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  library.add(fas)

  return (
    <NativeBaseProvider theme={appTheme}>
      <RecoilRoot>
        <Routes />
      </RecoilRoot>
    </NativeBaseProvider>
  );
}
const connectToDatabase = async () => {
  return openDatabase(
    { name: "acervoPauloDeTarsoApp.db", location: "default" },
    () => { },
    (error) => {
      console.error(error)
      throw Error("Could not connect to database")
    }
  )
}

//#region Livros

const createTables = async (db: SQLiteDatabase) => {

  // const removeTable = `DROP TABLE books`;

  const createTableBooksQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image TEXT,
      autor TEXT,
      classification TEXT,
      isbn TEXT
    );
  `

  try {
    await db.executeSql(createTableBooksQuery)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to create tables`)
  }
}

//#endregion
export default App;
