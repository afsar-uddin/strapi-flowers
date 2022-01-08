import React from 'react'
import Header from '../components/Header'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

const CATEGORY = gql`
    query GetCategory($id: ID!) {
        category(id: $id) {
            data {
                id,
                attributes {
                    categoryName,
                    blogs {
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
            }
        }
    }
`

export default function Category() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(CATEGORY, {
        variables: { id: id }
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>There is something wrong, check your data again...  </p>
    console.log(data.category.data.attributes.blogs.data)
    return (
        <div>
            <Header />
            <div className='category-post'>
                <h2>{data.category.data.attributes.categoryName}</h2>
                <div className='blog-posts'>
                    {
                        data.category.data.attributes.blogs.data.map(blog => (
                            <div key={blog.id} className='blog-card'>
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
                                        <p>{blog.attributes.desc.substring(0, 300)}...</p>
                                        <Link to={`/blog-detail/${blog.id}`}>View more</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div >
            </div>
        </div>
    )
}
