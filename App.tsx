import React, { useState } from 'react';
import axios from 'axios';
import BookCard from './components/BookCard';
import './styles/App.css';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Search query
  const [searchType, setSearchType] = useState<string>('title'); // Default search type
  const [books, setBooks] = useState<any[]>([]); // Array to hold books
  const [error, setError] = useState<string>(''); // Error message

  const fetchBooks = async () => {
    setError(''); // Reset error state
    if (!query.trim()) {
      setError('Please enter a search query.');
      return;
    }

    try {
      // Build the API endpoint based on selected search type
      const endpoint = `https://openlibrary.org/search.json?${searchType}=${query}&limit=10`;

      const response = await axios.get(endpoint);
      if (response.data.docs.length === 0) {
        setError('No books found. Try a different search.');
      } else {
        setBooks(response.data.docs.slice(0, 10)); // Get top 10 results
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  const clearInput = () => {
    setQuery(''); // Clear the input field
    setBooks([]); // Clear the search results
    setError(''); // Clear any previous error
  };

  return (
    <div className="App">
      {/* Header Section */}
      <div className="main-container">
        <h1 className="heading">BOOK FINDER 📚</h1>
        <div className="search-type-container">
          <select
            value={searchType}
            onChange={handleSearchTypeChange}
            className="search-type-select"
          >
            <option value="title">Book Title</option>
            <option value="author">Author Name</option>
            <option value="language">Language</option>
            <option value="year">Publish Year</option>
            <option value="place">Publish Place</option>
            <option value="publisher">Publisher</option>
          </select>
        </div>
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={`Search by ${searchType}`}
          />
          {query && (
            <span className="clear-button" onClick={clearInput}>
              &times;
            </span>
          )}
        </div>
        <button onClick={fetchBooks}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="book-grid">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default App;
