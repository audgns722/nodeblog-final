import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const List = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.post("/api/post/list")
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <div className="list__wrap">
            <div className="list__header">
                <h3>게시판</h3>
                <p>작성한 게시글을 볼수 있습니다.</p>
            </div>
            <div className='lists__wrap'>
                {postList.map((post, key) => (
                    <div className='list' key={key}>
                        <span className='cate'>교육</span>
                        <h3 className='title'><Link to={`/detail/${post.postNum}`}>{post.title}</Link></h3>
                        <p className='desc'>{post.content}</p>
                        <div className='auth'>주인장</div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default List