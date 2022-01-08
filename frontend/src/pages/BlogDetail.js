import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { gql, useQuery } from '@apollo/client'

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
    // console.log(data.blog.data.attributes.title)
    if (error) return <p>There is something wrong, check your data again...  </p>
    return (
        <>
            <Header />
            <div className='blog-detail'>
                <div className='rating'>{data.blog.data.attributes.rating}</div>
                <h2>{data.blog.data.attributes.title}</h2>
                <div className='categories'>
                    {
                        data.blog.data.attributes.categories.data.map(c => (
                            // console.log(c.attributes.categoryName)
                            <small key={c.id}>{c.attributes.categoryName}</small>
                        ))
                    }
                </div>
                <img src={`http://localhost:1337${data.blog.data.attributes.fig.data.attributes.url}`} />
                <p>{data.blog.data.attributes.desc}</p>
            </div>
        </>
    )
}
