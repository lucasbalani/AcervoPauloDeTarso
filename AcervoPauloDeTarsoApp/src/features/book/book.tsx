import { Text } from "react-native"
import BookList from "./components/book-list";

const Book = () => {
    return (
        <>
            <BookList showAddButton={true}/>
        </>
    )
}

export default Book;