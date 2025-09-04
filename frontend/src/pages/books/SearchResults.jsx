import React from 'react'
import { useLocation } from 'react-router-dom'
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'
import BookCard from './BookCard'

const useQuery = () => new URLSearchParams(useLocation().search)

const SearchResults = () => {
  const query = useQuery()
  const q = query.get('q') || ''

  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery(q)

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Search results for: {q}</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load results.</p>}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 gap-6">
          {books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            books.map(book => (
              <BookCard key={book._id} book={book} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default SearchResults


