import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Container from '../components/Container';
import Row from '../components/Row';
import Column from '../components/Column';
import Card from '../components/Card';
import { searchGoogleBooks, saveBook, getSavedBooks } from '../utils/API';

class Search extends Component {
    state = {
        searchTerm: '',
        bookList: [],
        savedBookIds: [],
        error: null
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        if (this.state.searchTerm === '') {
            return this.setState({error: 'Please put in a title.'})
        };

        searchGoogleBooks(this.state.searchTerm).then(res => {
              const {items} = res.data;
              this.setState({error: null})

              const bookListCleaned = items.map(book => {
                  return {
                    bookId: book.id, 
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''
                  };
              });

              return this.setState({ bookList: bookListCleaned, searchTerm: '' });
          })
           .then(this.retrieveSavedBooks)
           .catch(err => this.setState({ error: err }))
        };

        retrieveSavedBooks = () => {
            getSavedBooks()
              .then(res => {
                const savedBookIds = res.data.map(({bookId}) => bookId)
                this.setState({ savedBookIds });
              })
              .catch(err => this.setState({ error: err }));
        };

        handleBookSaveBook = bookId => {
            const book = this.state.bookList.find(book => book.bookId === bookId)
            saveBook(book).then(() => {
                const savedBookIds = [...this.state.savedBookIds, bookId]
                this.setState({ savedBookIds })
               })
               .catch(err => this.setState({ error: err }))
        }
    };

export default Search;