import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import firebase from '../../firebase';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    let navigate = useNavigate();

    const LoginFunc = async (e) => {
        e.preventDefault();
        if (!(email && password)) {
            return alert("모든 값을 채워주세요");
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            alert("로그인 성공하였습니다.")
            navigate("/");
        }
        catch (err) {
            console.log(err.code);
            if (err.code === "auth/invalid-email") {
                setErrorMsg("잘못된 이메일 형식입니다.")
            } else if (err.code === "auth/invalid-credential") {
                setErrorMsg("비밀번호가 일치하지 않습니다.")
            } else if (err.code === "auth/user-disabled") {
                setErrorMsg("사용자 계정이 비활성화됨.")
            } else if (err.code === "auth/user-not-found") {
                setErrorMsg("해당 이메일 주소에 대한 사용자가 없음.")
            } else if (err.code === "auth/wrong-password") {
                setErrorMsg("올바르지 않은 비밀번호.")
            } else {
                setErrorMsg("로그인에 실패하였습니다.")
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setErrorMsg("");
        }, 5000)
    }, [errorMsg])


    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>로그인</h3>
                <Link to='/join'><p>회원가입 하러가기</p></Link>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className="blind">로그인 영역</legend>
                    <div>
                        <label htmlFor="youEmail" className="required blind">이메일</label>
                        <input
                            type="email"
                            id="youEmail"
                            ame="youEmail"
                            placeholder="아이디"
                            className="input__style"
                            autoComplete='off'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input
                            type="password"
                            id="youPass"
                            name="youPass"
                            placeholder="비밀번호"
                            className="input__style"
                            autoComplete="off"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        {errorMsg !== "" && <p>{errorMsg}</p>}
                    </div>
                    <button type="submit" onClick={(e) => LoginFunc(e)} className="btn__style2 mt30">로그인</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login