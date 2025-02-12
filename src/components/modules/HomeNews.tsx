import React from 'react'
import { cookies } from 'next/headers';
import { baseUrl } from '@/utils/baseUrl';
import MainNewsSwiper from '../elements/MainNewsSwiper';
import { fetchCategories } from '@/utils/fetchCategories';

async function MainNewsCategoriesBlock({ category }: { category: CategoryI }) {
    const postsResponse = await fetch(`${baseUrl}/wp-json/wp/v2/posts?categories=${category.id}&per_page=9&_embed`, { next: { revalidate: 86400 } });
    const posts = await postsResponse.json();

    return (
        <MainNewsSwiper
            posts={posts}
        />
    )
}


export default async function HomeNews() {
    const allowedLocales: LocaleT[] = ["uk", "en", "de"];

    const localeRaw = (await cookies()).get('NEXT_LOCALE')?.value || "uk";
    const locale: LocaleT = allowedLocales.includes(localeRaw as LocaleT) ? (localeRaw as LocaleT) : "uk";

    const categories = await fetchCategories(baseUrl, locale);

    return (
        <section className="main-news">
            <div className="container">
                {categories.slice(0, 3).map((category: CategoryI) => (
                    <React.Fragment key={category.id}>
                        <h2 className="main-news__title" data-aos="fade-up">
                            {category.name}
                        </h2>
                        <div className="main-news__block main-news__block--margin">
                            <MainNewsCategoriesBlock category={category} />
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </section>
    )
}