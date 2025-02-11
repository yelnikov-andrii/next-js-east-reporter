import React from 'react'
import DefaultCategoryItem from '../elements/DefaultCategoryItem'
import Aside from '../elements/Aside'


export default function DefaultCategoryComponent({ posts }: { posts: PostI[] }) {
    return (
        <div className="categories__block">
            <div className="categories__list">
                {posts.map((post: PostI) => (
                    <DefaultCategoryItem 
                      key={post.id}
                      post={post}
                    />
                ))}
            </div>
            <Aside />
        </div>
    )
}