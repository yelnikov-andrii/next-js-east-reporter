import React from 'react'
import DefaultCategoryItem from '../elements/DefaultCategoryItem'


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
        </div>
    )
}