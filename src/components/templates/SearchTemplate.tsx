import React from 'react'
import Aside from '../elements/Aside'
import Breadcrumbs from '../elements/Breadcrumbs'
import { baseUrl } from '@/utils/baseUrl'
import DefaultCategoryItem from '../elements/DefaultCategoryItem';


export default async function SearchTemplate({ query }: { query: string }) {
    const searchResponse = await fetch(`${baseUrl}/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&_embed`);
    const searchedPosts = await searchResponse.json();
    console.log(searchedPosts)

    return (
        <main className="categories">
            <div className="container categories__container">
                <h1 className="categories__h1 h1">
                    Результати пошуку для: <span>{query}</span>
                </h1>
                <Breadcrumbs
                    arr={[]}
                    currentPost={query}
                />
                <div className="categories__block">
                    <div className="categories__list">
                        {searchedPosts.length > 0 ? searchedPosts?.map((post: PostI) => (
                            <DefaultCategoryItem
                                post={post}
                                key={post.id}
                            />
                        )) : (
                            <article className="categories__item">
                                <div className="categories__description-bottom-block">
                                    <h3 className="categories__p categories__p--notfound">
                                        За запитом нічого не знайдено
                                    </h3>
                                </div>
                            </article>
                        )}
                    </div>
                    <Aside />

                </div>
            </div>
        </main>
    )
}