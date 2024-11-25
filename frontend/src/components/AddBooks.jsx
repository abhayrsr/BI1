import { useState } from "react";

export default function AddBooks() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
    language: "",
    country: "",
    rating: "",
    summary: "",
    coverImageUrl: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prevState) => ({
        ...prevState,
        [name]:
        name === "publishedYear" || name === "rating" ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async(e) => {
    // e.preventDefault()
    try{
        const response = await fetch("http://localhost:3001/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            console.log("Failed to add book")
        }

        const data = await response.json()
        console.log("Added book", data)
    } catch(error){
        throw error
    }
  }

  return (
    <>
      <h2> Add a Book</h2>
      <form id="form">
        <label htmlFor="title">Title:</label><br />
        <input type="text" name="title" value={formData.title} id="title" onChange={handleChange} />
        <br /><br />

        <label htmlFor="author">Author:</label><br />
        <input type="text" name="author" value={formData.author} id="author" onChange={handleChange} />
        <br /><br />

        <label htmlFor="publishedYear">Published Year:</label><br />
        <input type="number" name="publishedYear" value={formData.publishedYear} id="publishedYear" onChange={handleChange} />
        <br /><br />

        <label htmlFor="genre">Genre:</label><br />
        <input type="text" name="genre" value={formData.genre} id="genre" onChange={handleChange} />
        <br /><br />

        <label htmlFor="language">Language:</label><br />
        <input type="text" name="language" value={formData.language} id="language" onChange={handleChange} />
        <br /><br />

        <label htmlFor="rating">Rating:</label><br />
        <input type="text" name="rating" value={formData.rating} id="rating" onChange={handleChange} />
        <br /><br />

        <label htmlFor="country">Country:</label><br />
        <input type="text" name="country" value={formData.country} id="country" onChange={handleChange} />
        <br /><br />

        <label htmlFor="summary">Summary:</label><br />
        <input type="text" name="summary" value={formData.summary} id="summary" onChange={handleChange} />
        <br /><br />

        <label htmlFor="coverImageUrl">Image Url:</label><br />
        <input type="text" name="coverImageUrl" value={formData.coverImageUrl} id="coverImageUrl" onChange={handleChange} />
        <br /><br />

        <button type="submit" onClick={handleSubmit}>Add Data</button>
      </form>
    </>
  );
}
