import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch('http://localhost:7000/blogs/' + id);
    const history = useHistory();

    const handleDelete = () => {
      fetch('http://localhost:7000/blogs/' + id, {
        method: 'DELETE'
      }).then(() => {
        console.log( blog.title + ' blog has been deleted');
        history.push('/');
      })
    }

    return (
        <div className="blog-details">
            {/* <h2>Blog Details - { id }</h2> */}
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <Link to={'/update/' + id} className="update">Update</Link>
                    <button onClick={ handleDelete }>Delete</button>
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;