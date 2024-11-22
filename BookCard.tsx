import React from 'react';

interface BookCardProps {
  book: {
    title: string;
    author_name?: string[];
    cover_i?: number;
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const coverURL = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/150';

  return (
    <div className="book-card">
      <img src={coverURL} alt={`${book.title} cover`} />
      <h3>{book.title}</h3>
      <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
    </div>
  );
};

export default BookCard;
