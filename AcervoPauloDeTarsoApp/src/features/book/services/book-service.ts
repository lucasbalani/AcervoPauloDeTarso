/* eslint-disable prettier/prettier */
import Book from "../models/book.model";
import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from "react-native-sqlite-storage"

enablePromise(true)

export default class BookService {
  static myInstance: BookService | null = null;

  static get instance(): BookService {

    return (BookService.myInstance ??= new BookService());
  }

  async list(db: SQLiteDatabase): Promise<Book[]> {
    const books: Book[] = [];

    const listAllBooksQuery = `
      SELECT * FROM books ORDER BY title
    `

    try {
      const results = await db.executeSql(listAllBooksQuery);

      results?.forEach((result) => {
        for (let index = 0; index < result.rows.length; index++) {
          books.push(result.rows.item(index))
        }
      })

      return books;
    } catch (error) {
      console.error(`[ERRO]: ${error}`)
      return books;
    }
  }

  async findBook(db: SQLiteDatabase, bookId: number): Promise<Book> {
    const findQuery = `SELECT 
                        * 
                       FROM 
                        Books 
                       WHERE 
                        Id = ${bookId}`

    try {
      const result = await db.executeSql(findQuery)

      const bookQuery = result[0].rows.item(0);

      if (!bookQuery)
        throw Error();

      return bookQuery;
    } catch (error) {
      throw Error("Livro não existe")
    }
  }

  async createBook(db: SQLiteDatabase, book: Book) {
    const insertQuery = `
      INSERT INTO Books (title, image, autor, classification, isbn)
      VALUES (?, ?, ?, ?, ?)
    `

    const values = [
      book.title,
      book.image,
      book.autor,
      book.classification,
      book.isbn,
    ]

    try {
      const results = await db.executeSql(insertQuery, values)

      return results[0].rows.item(0)
    } catch (error) {
      console.error(error)
      throw Error("Falha ao criar o livro")
    }
  }

  async removeBook(db: SQLiteDatabase, bookId: number) {
    const removeQuery = `
      DELETE FROM Books Where Id = ${bookId}
    `
    try {
      await db.executeSql(removeQuery)

      return true;
    } catch (error) {
      console.error(error)
      throw Error("Falha ao criar o livro")
    }
  }

  async updateBook(db: SQLiteDatabase, book: Book) {
    const updateQuery = `
      UPDATE
        Books
      SET
        Title = '${book.title}',
        Image = '${book.image}',
        Autor = '${book.autor}',
        Classification = '${book.classification}',
        Isbn = '${book.isbn}'
      Where
        Id = ${book.id}
    `

    try {
      const result = await db.executeSql(updateQuery)

      return result[0].rows.item(0)
    } catch (error) {
      console.error(error)
      throw Error("Falha ao atualizar o livro")
    }
  }
}
