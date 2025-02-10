import React from 'react'
import AnounceItem from '../elements/AnounceItem'


export default function AnouncesComponent({ posts }: { posts: PostI[] }) {

    return (
        <>
            <div className="anounces__list">
                {posts.map((post: PostI) => (
                    <AnounceItem 
                      post={post}
                      key={post.id}
                    />
                ))}
            </div>
            <nav className="pagination categories__pagination">
            </nav>
        </>
    )
}