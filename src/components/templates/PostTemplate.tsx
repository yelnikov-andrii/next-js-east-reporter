import { baseUrl } from '@/utils/baseUrl'
import React from 'react'
import Breadcrumbs from '../elements/Breadcrumbs';
import he from 'he'
import Article from '../modules/Article';
import Aside from '../elements/Aside';
import ArticleNav from '../elements/ArticleNav';
import RelatedPosts from '../modules/RelatedPosts';


export default async function PostTemplate({ post }: { post: PostI }) {
    const categoriesResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?include=${post.categories.join(',')}&_embed`);
    const categories = await categoriesResponse.json();

    return (
        <main className="categories-article">
            <div className="container categories-article__container">
                <Breadcrumbs
                    arr={categories}
                    currentPost={he.decode(post.title.rendered)}
                />
                <div className="categories-article__block">
                    <div className="categories-article__article-wrapper">
                        <Article
                            post={post}
                            categories={categories}
                        />
                        <ArticleNav
                            post={post}
                        />
                        <RelatedPosts 
                          post={post}
                        />
                    </div>
                    <Aside />
                </div>
            </div>
        </main>
    )
}