import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Avatar, Box, Button, Divider, HStack, Pressable, Spacer, VStack, useTheme } from "native-base";
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

        setBooks(await BookService.instance.list(db))
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

    return (
        <Box style={{ padding: 8 }}>
            <HStack p="4" w="100%" justifyContent={'space-between'} alignItems='center'>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Livros</Text>
                {!!showAddButton && (
                    <Button shadow={2} onPress={() => newBook()}>
                        <FontAwesomeIcon icon={"plus"} />
                    </Button>
                )}
            </HStack>
            <Divider />

            {/* </Heading> */}
            <FlatList
                data={books}
                style={{ padding: 16, paddingTop: 0 }}
                renderItem={({ item }) =>
                    <>
                        <Box style={{ marginTop: 8 }}>
                            <HStack space={[2, 3]} justifyContent="space-between" alignItems={"center"}>
                                <Pressable w={"80%"} onPress={() => selectBook(item.id)}>
                                    <HStack space={[2, 3]} justifyContent="space-between">
                                        <Avatar size="md" source={{ uri: item.image }}
                                            style={{ borderColor: appTheme.colors.secondary[100], borderStyle: "dotted", borderWidth: 2 }} />
                                        <VStack>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
                                            <Divider />
                                            <Text style={{ fontSize: 10, fontStyle: "italic", color: appTheme.colors.warning[900] }}>{item.autor}</Text>
                                        </VStack>
                                        <Spacer />
                                    </HStack>
                                </Pressable>
                                {!!showRemoveButton && (
                                    <Pressable onPress={() => removeBook(item.id)}>
                                        <FontAwesomeIcon color="red" icon={"trash"} />
                                    </Pressable>
                                )}
                            </HStack>
                            <Divider style={{ marginTop: 5 }} />
                        </Box>
                    </>
                }
            />
        </Box>
    )
}

export default BookList;