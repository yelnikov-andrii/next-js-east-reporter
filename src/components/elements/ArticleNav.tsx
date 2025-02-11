import { baseUrl } from '@/utils/baseUrl';
import { replacebaseUrl } from '@/utils/replaceBaseUrl';
import Link from 'next/link';
import React from 'react'


export default async function ArticleNav({ post }: { post: PostI }) {
    const getAdjacentPosts = async (post: PostI) => {
        const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts?categories=${post.categories[0]}&per_page=100&_embed`);
        const posts = await res.json();

        // Сортируем по дате (от нового к старому)
        posts.sort((a: PostI, b: PostI) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const currentIndex = posts.findIndex((p: PostI) => p.id === post.id);
        const prevPost = posts[currentIndex + 1] || null;
        const nextPost = posts[currentIndex - 1] || null;

        return {
            prevPost,
            nextPost,
        };
    };

    const { prevPost, nextPost } = await getAdjacentPosts(post);

    return (
        <nav className="categories-article__nav categories-article-nav">
            {prevPost && (
                <Link href={`${replacebaseUrl(prevPost.link)}`} className="categories-article-nav__item categories-article-nav__item--prev">
                    <svg className="categories-article-nav__button" focusable="false" aria-hidden="true"
                        viewBox="0 0 24 24" data-testid="ArrowBackIosIcon">
                        <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
                    </svg>
                    <h2 className="categories-article-nav__h2 categories-article-nav__h2--small">
                        {prevPost.title.rendered}
                    </h2>
                </Link>
            )}

            {nextPost && (
                <Link href={nextPost.link} className="categories-article-nav__item categories-article-nav__item--next">
                    <h2 className="categories-article-nav__h2 categories-article-nav__h2--small">
                        {nextPost.title.rendered}
                    </h2>
                    <svg className="categories-article-nav__button" focusable="false" aria-hidden="true"
                        viewBox="0 0 24 24" data-testid="ArrowForwardIosIcon">
                        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                    </svg>
                </Link>
            )}
        </nav>
    )
}