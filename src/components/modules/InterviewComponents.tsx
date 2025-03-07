import React from 'react'
import InterviewItem from '../elements/InterviewItem'
import Aside from '../elements/Aside'

export default function InterviewComponent({ posts }: { posts: InterviewPost[] }) {
    return (
        <div className="categories__block interview">
            <div className="categories__list interview__list">
                {posts.map((post) => (
                    <InterviewItem
                        post={post}
                        key={post.id}
                    />
                ))}
            </div>
            <Aside />
        </div>
    )
}