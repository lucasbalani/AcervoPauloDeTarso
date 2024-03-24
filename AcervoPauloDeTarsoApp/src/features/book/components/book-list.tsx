import { Box, Heading, HStack, Avatar, VStack, Divider, Spacer, useTheme } from "native-base";
import { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";
import BookService from "../services/book-service";
import Book from "../models/book.model";

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const appTheme = useTheme();

    const fetchData = async () => {
        setBooks(await BookService.instance.list())
    }

    useEffect(() => {
        if (books.length === 0)
            fetchData()
    }, [books]);

    return (
        <Box>
            <Heading fontSize="xl" p="4" pb="3">
                <Text>Livros</Text>
            </Heading>
            <FlatList
                data={books}
                style={{ padding: 16 }}
                renderItem={({ item }) =>
                    <Box style={{ marginTop: 8 }}>
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
                        <Divider style={{ marginTop: 5 }} />
                    </Box>
                }
            />
        </Box>
    )
}

export default BookList;