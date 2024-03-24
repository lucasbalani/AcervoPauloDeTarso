import { useNavigation } from "@react-navigation/native";
import BookList from "../book/components/book-list";

const Home = () => {
    const navigation = useNavigation();

    return <BookList />
}

export default Home;