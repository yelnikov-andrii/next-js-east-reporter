import React from 'react'
import SearchForm from '../elements/SearchForm'
import { baseUrl } from '@/utils/baseUrl'
import Link from 'next/link';
import { replacebaseUrl } from '@/utils/replaceBaseUrl';
import he from 'he'


export default async function Aside() {
    const recentNewsResponse = await fetch(`${baseUrl}/wp-json/wp/v2/posts?per_page=9`);
    const recentNews = await recentNewsResponse.json();

    const categoriesResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?parent=0&lang=uk`);
    const categories = await categoriesResponse.json();
    const categoriesFiltered = categories.filter((category: CategoryI) => category.count > 0);

    const categoriesNewsResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=news`);
    const categoriesNews = await categoriesNewsResponse.json();
    const parentId = categoriesNews[0].id;

    const categoriesNewsChildrenResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?parent=${parentId}`);
    const categoriesNewsChildren = await categoriesNewsChildrenResponse.json();

    return (
        <aside className="categories-article__aside categories-article-aside">
            <div className="categories-article-aside__block">
                <h2 className="categories-article__h2">
                    Пошук по сайту
                </h2>
                <SearchForm />
            </div>
            <div className="categories-article-aside__block">
                <h2 className="categories-article-aside__h2">
                    Нещодавні новини
                </h2>
                <div className="categories-article-aside__list">
                    {recentNews.map((recentNew: PostI) => (
                        <Link href={`/${recentNew.slug}`} key={recentNew.id} className="categories-article__link categories-article-aside__link">
                            {he.decode(recentNew.title.rendered)}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="categories-article-aside__block">
                <h2 className="categories-article-aside__h2">
                    Категорії
                </h2>
                <div className="categories-article-aside__list">
                    {categoriesFiltered.map((category: CategoryI) => (
                        <Link key={category.id} href={replacebaseUrl(category.link)} className="categories-article__link categories-article-aside__link">
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="categories-article-aside__h2">
                    Новини
                </h2>
                <div className="categories-article-aside__list">
                    {categoriesNewsChildren.map((category: CategoryI) => (
                        <Link key={category.id} href={replacebaseUrl(category.link)} className="categories-article__link categories-article-aside__link">
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    )
}