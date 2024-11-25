import { useState } from "react";
import useFetch from "../useFetch";

const Books = () => {
  const { data, loading } = useFetch("http://localhost:3001/books");
  const [successMessage, setSuccessMessage] = useState('')
  console.log(data);

  const handleDelete = async (bookId) => {
    try{
      const response = await fetch(`http://localhost:3001/books/${bookId}`, { method: "DELETE"})
      if(!response.ok){
        throw "Failed to delete book."
      }
      const data = await response.json()

      if(data){
        setSuccessMessage("Book deleted successfully")
        window.location.reload()
      }
    } catch (error){
      console.log(error)
    }
  }

  return (
    <>
      <h2>All Books</h2>
      {loading && <p>Loading...</p>}
      {data?.error && <p>{data?.error}</p>}
      <ul>
        {data?.map((book) => (
          <li key={book._id}>{book.title} <button onClick={() => handleDelete(book._id)}>Delete</button></li>
        ))}
      </ul>
      <p>{successMessage}</p>
    </>
  );
};

export default Books;
