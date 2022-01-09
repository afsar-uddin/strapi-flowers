import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { gql, useQuery } from '@apollo/client'
import ReactStars from "react-rating-stars-component"
import Footer from '../components/Footer'

const BLOG = gql`
    query GetBlog($id: ID!) {
        blog(id: $id) {
            data {
                id,
                attributes {
                    title,
                    desc,
                    rating,
                    categories {
                        data {
                            id,
                            attributes {
                                categoryName
                            }
                        }
                    }
                    fig {
                        data {
                            attributes {
                                url
                            }   
                        }
                    }
                }
            }
        }
    }
`

export default function BlogDetail() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(BLOG, {
        variables: { id: id }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>There is something wrong, check your data again...  </p>
    return (
        <>
            <Header />
            <div className='blog-detail detail-post'>

                <h2>{data.blog.data.attributes.title}</h2>
                <div className='categories'>
                    {
                        data.blog.data.attributes.categories.data.map(c => (
                            <small key={c.id}>Category : {c.attributes.categoryName}</small>
                        ))
                    }
                </div>
                <div className='blog-fig'>
                    <div className='rating'>
                        <ReactStars
                            count={data.blog.data.attributes.rating}
                            color="#ffd700"
                        />
                    </div>
                    <img src={`http://localhost:1337${data.blog.data.attributes.fig.data.attributes.url}`} />
                </div>
                <p>{data.blog.data.attributes.desc}</p>
            </div>
            <Footer />
        </>
    )
}
