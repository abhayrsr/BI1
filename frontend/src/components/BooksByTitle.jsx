import useFetch from "../useFetch";

const BooksByTitle = ({title}) => {
    const { data, loading} = useFetch(`http://localhost:3001/books/${title}`)
    console.log(data)

    return (
        
            data ? (
                <div>
                    <h2>{data.title}</h2>
                    <p><strong>Author: </strong>{data.author}</p>
                    <p><strong>Release Year: </strong>{data.publishedYear}</p>
                    <p><strong>Genre: </strong>{data.genre.join(", ")}</p>
                </div> ): loading && <p>loading...</p>
            
        
    )
}

export default BooksByTitle