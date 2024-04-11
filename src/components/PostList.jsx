import { useState, useEffect } from 'react';
import Post from './Post'
import classes from './PostList.module.css'
import NewPost from './NewPost';
import Modal from './Modal';

function PostList({ isPosting, onStopPosting }) {

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            setIsFetching(true)
            const response = await fetch('http://localhost:8080/posts')
            const resData = await response.json();
            setPosts(resData.posts)
        }

        fetchPosts();
    }, [])


    const [posts, setPosts] = useState([]);

    function addPostHandler(postData) {
        fetch('http://localhost:8080/posts', {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setPosts((existingPosts) => [postData, ...existingPosts])
    }


    let modalContent;

    if (isPosting === true) {
        modalContent = <Modal onClose={onStopPosting}>
            <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>;
    }


    return (
        <>
            {modalContent}
            <ul className={classes.posts}>
                {/* <Post name={enteredAuthor} content={enteredBody} /> */}
                {/* <Post name="test2" content="test2" /> */}
                {posts.length > 0 &&
                    posts.map((post) => <Post key={post.body} name={post.author} content={post.body} />)}

            </ul>

            {posts.length === 0 &&
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>Tehre are no post yet</h2>
                </div>
            }
        </>
    )
}

export default PostList;