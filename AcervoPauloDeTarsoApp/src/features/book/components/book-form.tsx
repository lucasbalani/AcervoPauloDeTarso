import { useRoute } from "@react-navigation/native";
import { Box, Button, HStack, Input, Text, TextField } from "native-base";
import { Controller, useForm } from "react-hook-form";
import Book from "../models/book.model";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BookService from "../services/book-service";
import { openDatabase } from "react-native-sqlite-storage";
import { useRecoilState } from "recoil";
import { isLoadingBookAdmin } from "../states/isLoadingBookAdmin";
import { isLoadingBookHome } from "../states/isLoadingBookHome";
import { isLoadingFindBook } from "../states/isLoadingFindBook";
import { clearBookForm } from "../states/clearBookForm";

const BookForm = () => {
    const route = useRoute<any>();
    const { bookId } = route.params;
    const [loadingBookHome, setIsLoadingBookHome] = useRecoilState(isLoadingBookHome);
    const [loadingBookAdmin, setIsLoadingBookAdmin] = useRecoilState(isLoadingBookAdmin);
    const [loadingFindBook, setLoadingFindBook] = useRecoilState(isLoadingFindBook);
    const [clearForm, setClearForm] = useRecoilState(clearBookForm);

    const {
        control,
        setFocus,
        reset,
        register,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<Book>();

    const handleSave = async () => {
        const values = getValues();
        const bookCreate: Book = {
            id: values.id,
            title: values.title,
            autor: values.autor,
            image: values.image,
            isbn: values.isbn,
            classification: values.classification
        }

        !bookId ? await BookService.instance.createBook(await connectToDatabase(), bookCreate) :
            await BookService.instance.updateBook(await connectToDatabase(), bookCreate)

        reset();
        setIsLoadingBookHome(true);
        setIsLoadingBookAdmin(true);
    }

    const findBook = async () => {
        reset();
        const book = await BookService.instance.findBook(await connectToDatabase(), bookId)

        if (!!book) {
            setValue("id", book.id);
            setValue("title", book.title);
            setValue("image", book.image);
            setValue("autor", book.autor);
            setValue("isbn", book.isbn);
            setValue("classification", book.classification);
        }

        setLoadingFindBook(false);
    }

    useEffect(() => {

        if (!!bookId && loadingFindBook)
            findBook();
    }, [loadingFindBook]);

    useEffect(() => {
        reset();

    }, [clearForm]);

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

    return (
        <Box style={{ padding: 5 }}>
            <Box style={{ marginTop: 20 }}>
                <Controller
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Input
                            placeholder="Título"
                            onChangeText={field.onChange}
                            value={field.value}
                        />
                    )}
                    name="title"
                />
            </Box>
            <Box style={{ marginTop: 20 }}>
                <Controller
                    name="image"
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Input
                            placeholder="Imagem"
                            onChangeText={field.onChange}
                            value={field.value}
                        />
                    )}
                />
            </Box>
            <Box style={{ marginTop: 20 }}>
                <Controller
                    name="autor"
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Input
                            placeholder="Autor"
                            onChangeText={field.onChange}
                            value={field.value}
                        />
                    )}
                />
            </Box>
            <Box style={{ marginTop: 20 }}>
                <Controller
                    name="isbn"
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Input
                            placeholder="Isbn"
                            onChangeText={field.onChange}
                            value={field.value}
                        />
                    )}
                />
            </Box>
            <Box style={{ marginTop: 20 }}>
                <Controller
                    name="classification"
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Input
                            placeholder="Classificação"
                            onChangeText={field.onChange}
                            value={field.value}
                        />
                    )}
                />
            </Box>
            <HStack w={"100%"} marginTop={5} alignItems="center" justifyContent="flex-end">
                <Button disabled={!!loadingFindBook} shadow={2} onPress={() => handleSave()}>
                    <HStack alignItems="center">
                        <FontAwesomeIcon style={{ marginEnd: 5 }} icon={"check"} />
                        <Text>Salvar</Text>
                    </HStack>
                </Button>
            </HStack>
        </Box>
    )
}

export default BookForm;