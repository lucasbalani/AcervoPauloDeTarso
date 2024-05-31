
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Avatar, Box, Button, Divider, HStack, Pressable, Spacer, VStack, useTheme } from "native-base";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { openDatabase } from "react-native-sqlite-storage";
import { useRecoilState } from "recoil";
import Book from "../models/book.model";
import BookService from "../services/book-service";
import { isLoadingBookAdmin } from "../states/isLoadingBookAdmin";
import { isLoadingBookHome } from "../states/isLoadingBookHome";
import { isLoadingFindBook } from "../states/isLoadingFindBook";
import { clearBookForm } from "../states/clearBookForm";

interface BookListProps {
    books: Book[];
    showAddButton?: boolean;
    showRemoveButton?: boolean;
}

const BookList: React.FC<BookListProps> = ({ books, showAddButton = false, showRemoveButton = false }) => {
    const [isLoading, setIsLoading] = useRecoilState(!!showAddButton ? isLoadingBookAdmin : isLoadingBookHome);
    const [loadingBookHome, setIsLoadingBookHome] = useRecoilState(isLoadingBookHome);
    const [loadingBookAdmin, setIsLoadingBookAdmin] = useRecoilState(isLoadingBookAdmin);
    const [loadingFindBook, setIsLoadingFindBook] = useRecoilState(isLoadingFindBook);
    const [clearBookPage, setClearBookPage] = useRecoilState(clearBookForm);

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const appTheme = useTheme();
    const navigationRef = useRef(null);

    const selectBook = (bookSelectedId: number) => {
        setIsLoadingFindBook(true);
        navigation.navigate("BookForm", { bookId: bookSelectedId });
    }

    const removeBook = async (bookId: number) => {
        await BookService.instance.removeBook(await connectToDatabase(), bookId);
        setIsLoadingBookAdmin(true);
        setIsLoadingBookHome(true);
        setIsLoading(true);
    }

    const newBook = () => {
        setClearBookPage(true);
        navigation.navigate("BookForm", { bookId: undefined });
    }

    const connectToDatabase = async () => {
        return openDatabase(
            { name: "acervoPauloDeTarsoApp.db", location: "default" },
            () => { },
            (error) => {
                console.error(error);
                throw Error("Could not connect to database");
            }
        );
    }

    const renderItem = ({ item }) => (
        <View style={styles.bookItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
        </View>
    );

    return (
        <Box style={{ padding: 8 }}>
            <HStack
                p="4"
                w="100%"
                justifyContent={'space-between'}
                alignItems="center">
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Livros</Text>
                {!!showAddButton && (
                    <Button shadow={2} onPress={newBook}>
                        <FontAwesomeIcon icon={'plus'} />
                    </Button>
                )}
            </HStack>
            <Divider />
            <FlatList
                data={books}
                renderItem={({ item }) => {
                    if (item.type === 'header') {
                        return (
                            <Box p="4" w="100%">
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    {item.classification === 'null' ? 'Sem classificação' : item.classification}
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
                                        source={{ uri: item.image }}
                                    />
                                    <VStack padding={2} w="80%" alignItems="flex-start" marginLeft={3}>
                                        <Text>{item.title}</Text>
                                        <Text>{item.author}</Text>
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
    );
}

const styles = StyleSheet.create({
    bookItem: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 18,
    },
    author: {
        fontSize: 16,
        color: '#555',
    },
});

export default BookList;