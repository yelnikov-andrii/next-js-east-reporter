import { baseUrl } from '@/utils/baseUrl'
import React from 'react'
import { cookies } from 'next/headers';

const CategoryList = ({ categories }: {categories: CategoryI[]}) => {
    return (
        <ul className="main-marquee__content">
            {categories.map((category: CategoryI) => (
                <li className="dropdown__item" key={category.id}>
                    <a href="" className="main-marquee__link">
                        {category.name}
                    </a>
                </li>
            ))}
        </ul>
    )
}


export default async function Marquee() {
    type Locale = "uk" | "en" | "de";
    const allowedLocales: Locale[] = ["uk", "en", "de"];

    const localeRaw = (await cookies()).get('NEXT_LOCALE')?.value || "uk";
    const locale: Locale = allowedLocales.includes(localeRaw as Locale) ? (localeRaw as Locale) : "uk";

    const categoriesResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?lang=${locale}&parent=0&hide_empty=true`);
    const categories = await categoriesResponse.json();

    return (
        <nav className="main-marquee">
            <CategoryList categories={categories} />
            <CategoryList categories={categories} />
        </nav>
    )
}