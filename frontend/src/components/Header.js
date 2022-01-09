import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const CATEGORIES = gql`
    query {
        categories {
            data {
                id,
                attributes {
                    categoryName
                }
            }
        }
    }
`
export default function Header() {
    const { loading, error, data } = useQuery(CATEGORIES)
    // console.log(data.categories.data.attributes)
    if (loading) return <p>Loading categories...</p>
    if (error) return <p>Error fatching categories...  </p>

    return (
        <div className='header'>
            <Link to="/">All Collection</Link>
            {
                data.categories.data.map(category => (
                    // console.log(category.id)
                    <NavLink key={category.id} to={`/category/${category.id}`}>{category.attributes.categoryName}</NavLink>
                ))
            }
        </div>
    )
}
