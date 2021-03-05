import { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios'

function App() {
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async() => {
      const result = await axios.get('/posts')
      setPosts(result.data.posts)
    })()
  }, [])

  const submit = async event => {
    event.preventDefault()
    const data = new FormData()
    data.append('image', file)
    data.append('description', description)
    const result = await axios.post('/posts', data)
    setPosts([result.data, ...posts])
  }

  return (
    <div className="App">
      <header>
        <h1>App 3000</h1>
      </header>
      <form onSubmit={submit}>
        <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input>
        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
          placeholder="description"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <main>
        {posts.map(post => (
          <figure key={post.id}>
            <img src={post.image_url}></img>
            <figcaption>{post.description}</figcaption>
          </figure>
        ))}
      </main>
    </div>
  )
}

export default App
