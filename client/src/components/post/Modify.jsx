import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Modify = () => {
    let params = useParams();
    let navigate = useNavigate();

    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 작성글 정보 가져오기
    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    useEffect(() => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
    }, [postInfo]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("모든 항목을 채워주세요")
        }

        let body = {
            title: title,
            content: content,
            postNum: params.postNum
        }

        axios.post("/api/post/modify", body)
            .then((response) => {
                if (response.data.success) {
                    alert("수정이 완료되었습니다.")
                    navigate(`/list`)
                } else {
                    alert("수정에 실패 하였습니다.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='write__wrap'>
            <div className="write__header">
                <h3>글 수정</h3>
                <p>게시글을 수정할 수 있습니다.</p>
            </div>
            <form className='write__form'>
                <fieldset>
                    <legend className="blind">글쓰기 영역</legend>
                    <div>
                        <label htmlFor="title" className="required blind">게시글</label>
                        <input
                            type="text"
                            id="title"
                            placeholder='글을 작성해주세요'
                            value={title || ""}
                            onChange={(e) => {
                                setTitle(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="required blind" >게시글</label>
                        <textarea
                            type="text"
                            id="content"
                            placeholder='글을 작성해주세요'
                            value={content || ""}
                            onChange={(e) => {
                                setContent(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1);
                            }}
                        >취소하기</button>
                        <button
                            type="submit"
                            onClick={(e) => {
                                onSubmit(e);
                            }}
                        >수정하기</button>
                    </div>
                </fieldset>
            </form>
        </div >
    )
}

export default Modify