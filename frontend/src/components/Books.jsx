import useFetch from "../useFetch";

const Books = () => {
  const { data } = useFetch("http://localhost:3001/books");
  console.log(data);

  return (
    <>
      <h2>All Books</h2>
      <ul>
        {data?.map((book) => (
          <li>{book.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Books;
