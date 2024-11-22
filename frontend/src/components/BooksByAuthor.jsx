import useFetch from "../useFetch"

export default function BooksByAuthor({authorName}){
    const { data} = useFetch(`http://localhost:3001/books/author/${authorName}`)
    console.log("data", data.author)

    return(
        <>
            <h2>Books by {authorName}</h2>
            <ul>
                <li>{data.title}</li>
            </ul>
        </>
    )
}