import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const Update = () => {
    const [isPending, setIsPending] = useState(false);

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    
    const history = useHistory();

    useEffect(() => {
      fetch(`http://localhost:7000/blogs/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setBody(data.body);
          setAuthor(data.author);
        })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBlog  = { title, body, author }
  
        setIsPending(true);
  
        fetch(`http://localhost:7000/blogs/${id}`, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBlog )
        }).then(() => {
          console.log('blog updated');
          setIsPending(false);
          history.push('/');
        }).catch((error) => {
            console.log("Error updating blog:", error);
        })
      }

    return (
        <div className="update">
            <h2>Update Blog</h2>
            <form onSubmit={ handleSubmit }>
                <label>Blog title:</label>
                <input 
                    type="text" 
                    value={ title } 
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                    required
                />
                <label>Blog body:</label>
                <textarea 
                    value={ body } 
                    onChange={(e) => {
                        setBody(e.target.value)
                    }}
                    required
                ></textarea>
                <label>Blog author:</label>
                <select 
                    value={ author } 
                    onChange={(e) => {
                        setAuthor(e.target.value)
                    }}
                    required
                >
                    <option value=""></option>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {/* <button>Update Blog</button> */}
                { !isPending && <button>Update Blog</button> }
                { isPending && <button disabled>Updating blog...</button> }
            </form>
        </div>
    );
}
 
export default Update;