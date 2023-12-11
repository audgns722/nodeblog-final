import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Image2 from "./Image2";

const Write = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("내용을 채워주세요");
        }

        let body = {
            title: title,
            content: content,
            image: image,
        }

        axios
            .post("/api/post/write", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    navigate("/list");
                } else {
                    alert("글 작성이 실패하였습니다.");
                }
            })
    }
    return (
        <div className='write__wrap'>
            <div className="write__header">
                <h3>글쓰기</h3>
                <p>게시글을 작성할수 있습니다.</p>
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
                            autoComplete="off"
                            required
                            value={title}
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
                            autoComplete="off"
                            required
                            value={content}
                            onChange={(e) => {
                                setContent(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <Image2 setImage={setImage} />
                    <button
                        type="submit"
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >글쓰기</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Write