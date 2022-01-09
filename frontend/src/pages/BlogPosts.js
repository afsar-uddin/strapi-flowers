import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

const BLOGS = gql`
    query{
        blogs(pagination: { page: 1, pageSize: 100 }) {
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
            meta {
                pagination {
                  page
                  pageSize
                  pageCount
                  total
                }
              }
        }
    }
`

export default function BlogPosts() {
    const { loading, error, data } = useQuery(BLOGS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>There is something wrong, check your data again...  </p>
    return (
        <div className='page-content'>
            <h2>Seasonal Flowers</h2>
            <div className='blog-posts'>

                {
                    data.blogs.data.map(blog => (
                        <div key={blog.id} className='blog-card'>
                            <div className='categories'>
                                {
                                    blog.attributes.categories.data.map(c => (
                                        <small key={c.id}>Category : {c.attributes.categoryName}</small>
                                    ))
                                }
                            </div>
                            <div className='blog-detail'>
                                <div className='blog-fig'>
                                    <div className='rating'>
                                        <ReactStars
                                            count={blog.attributes.rating}
                                            color="#ffd700"
                                        />
                                    </div>
                                    <Link to={`/blog-detail/${blog.id}`}>
                                        <img src={`http://localhost:1337${blog.attributes.fig.data.attributes.url}`} />
                                    </Link>

                                </div>
                                <div className='content'>
                                    <h2>{blog.attributes.title}</h2>
                                    <p>{blog.attributes.desc.substring(0, 40)}...</p>
                                    <Link to={`/blog-detail/${blog.id}`}>View more</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >
        </div>
    )
}