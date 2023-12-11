import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer id='footer' role='contentinfo'>
            <Link
                href='mailto:audgns722@naver.com'
                rel='noopener noreferrer'
            >
                audgns722@naver.com
            </Link>
        </footer>
    )
}

export default Footer