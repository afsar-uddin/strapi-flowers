import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function NotFound() {
    return (
        <div>
            <Header />
            <p>Not found what are you looking for...</p>
            <Link to="/">Back to home</Link>
        </div>
    )
}
