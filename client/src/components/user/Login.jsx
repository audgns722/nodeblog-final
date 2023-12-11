import React from 'react'
import { Link } from 'react-router-dom'

const login = () => {
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
                        <label htmlFor="youID" className="required blind">아이디</label>
                        <input type="email" id="youID" name="youID" placeholder="아이디" className="input__style" autoComplete='off' required />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input type="password" id="youPass" name="youPass" placeholder="비밀번호" className="input__style" autoComplete="off" required />
                    </div>
                    <button type="submit" className="btn__style2 mt30">로그인</button>
                </fieldset>
            </form>
        </div>
    )
}

export default login