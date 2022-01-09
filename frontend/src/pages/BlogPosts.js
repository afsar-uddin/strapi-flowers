import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'

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

    // console.log(data.blogs.data.length)
    if (loading) return <p>Loading...</p>
    if (error) return <p>There is something wrong, check your data again...  </p>
    return (
        <div className='blog-posts'>
            <h1>Total {data.blogs.data.length} items</h1>
            {
                data.blogs.data.map(blog => (
                    // console.log(blog.attributes.title)
                    <div key={blog.id} className='blog-card'>
                        {/* {console.log(blog.attributes.fig.data.attributes.formats.thumbnail.url)} */}
                        <div className='rating'>{blog.attributes.rating}</div>
                        <div className='blog-content'>
                            <div className='blog-detail'>
                                <h2>{blog.attributes.title}</h2>
                                <div className='categories'>
                                    {
                                        blog.attributes.categories.data.map(c => (
                                            <small key={c.id}>{c.attributes.categoryName}</small>
                                        ))
                                    }
                                </div>
                                <img src={`http://localhost:1337${blog.attributes.fig.data.attributes.url}`} />
                                <p>{blog.attributes.desc.substring(0, 40)}...</p>
                                <Link to={`/blog-detail/${blog.id}`}>View more</Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}