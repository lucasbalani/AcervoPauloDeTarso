import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Avatar, Box, Button, Divider, HStack, Input, Pressable, Spacer, VStack, useTheme } from "native-base";
import { useEffect, useRef, useState } from "react";
import { FlatList, Text } from "react-native";
import Book from "../models/book.model";
import BookService from "../services/book-service";
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { openDatabase } from "react-native-sqlite-storage";
import { useRecoilState } from "recoil";
import { isLoadingBookAdmin } from "../states/isLoadingBookAdmin";
import { isLoadingBookHome } from "../states/isLoadingBookHome";
import { isLoadingFindBook } from "../states/isLoadingFindBook";
import { clearBookForm } from "../states/clearBookForm";

interface BookListProps {
  showAddButton?: boolean;
  showRemoveButton?: boolean;
}

const BookList = ({ showAddButton = false, showRemoveButton = false }: BookListProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isLoading, setIsLoading] = useRecoilState(!!showAddButton ? isLoadingBookAdmin : isLoadingBookHome);
  const [loadingBookHome, setIsLoadingBookHome] = useRecoilState(isLoadingBookHome);
  const [loadingBookAdmin, setIsLoadingBookAdmin] = useRecoilState(isLoadingBookAdmin);

  const [loadingFindBook, setIsLoadingFindBook] = useRecoilState(isLoadingFindBook);
  const [clearBookPage, setClearBookPage] = useRecoilState(clearBookForm);

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const appTheme = useTheme();

  const navigationRef = useRef(null);

  const fetchData = async () => {
    const db = await connectToDatabase();
    const allBooks = !!searchTerm ? await BookService.instance.listBySearchTerm(db, searchTerm) : await BookService.instance.list(db);

    // agrupar os livros por classificação
    const groupedBooks = allBooks.reduce((grouped, book) => {
      (grouped[book.classification] =
        grouped[book.classification] || []).push(book);
      return grouped;
    }, {});


    /// transformar o objeto agrupado em um array achatado
    const flatListData = Object.entries(groupedBooks).reduce(
      (list, [classification, books]) => {
        return list.concat(
          { type: 'header', classification },
          ...books.map(book => ({ type: 'book', ...book })),
        );
      }
      , []);



    setBooks(flatListData);
    setIsLoading(false);
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

  const selectBook = (bookSelectedId: number) => {
    setIsLoadingFindBook(true);

    navigation.navigate("BookForm", { bookId: bookSelectedId })
  }

  const removeBook = async (bookId: number) => {
    await BookService.instance.removeBook(await connectToDatabase(), bookId)

    setIsLoadingBookAdmin(true);
    setIsLoadingBookHome(true);
    setIsLoading(true);
  }

  const newBook = () => {
    setClearBookPage(true);

    navigation.navigate("BookForm", { bookId: undefined });
  }

  useEffect(() => {
    if (isLoading)
      fetchData()

  }, [books, isLoading]);

  useEffect(() => {
    fetchData()
  }, [searchTerm]);

  return (
    <>
      <Input
        placeholder="Pesquisar"
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <Box style={{ padding: 8 }}>
        <HStack
          p="4"
          w="100%"
          justifyContent={'space-between'}
          alignItems="center">
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Livros</Text>
          {!!showAddButton && (
            <Button shadow={2} onPress={() => newBook()}>
              <FontAwesomeIcon icon={'plus'} />
            </Button>
          )}
        </HStack>
        <Divider />

        {/* </Heading> */}
        <FlatList
          data={books}
          renderItem={({ item }) => {
            if (item.type === 'header') {
              return (
                <Box
                  p="4"
                  w="100%"
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    {item.classification === 'null'
                      ? 'Sem classificação'
                      : item.classification}
                  </Text>
                </Box>
              );
            } else {
              return (
                <Pressable onPress={() => selectBook(item.id)}>
                  <HStack
                    p="4"
                    w="100%"
                    justifyContent={'space-between'}
                    alignItems="center">
                    <Avatar
                      size="md"
                      source={{
                        uri: item.image,
                      }}
                    />
                    <VStack padding={2} w="80%" alignItems="flex-start" marginLeft={3}>
                      <Text>{item.title}</Text>
                      <Text>{item.autor}</Text>
                    </VStack>
                    <Spacer />
                    {!!showRemoveButton && (
                      <Button
                        shadow={2}
                        onPress={() => removeBook(item.id)}
                        colorScheme="danger"
                        style={{ marginLeft: -25 }}>
                        <FontAwesomeIcon icon={'trash'} />
                      </Button>
                    )}
                  </HStack>
                </Pressable>
              );
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </>
  );
}

export default BookList;