import React from 'react'
import { cookies } from 'next/headers';
import { fetchCategories } from '@/utils/fetchCategories';
import { baseUrl } from '@/utils/baseUrl';
import Link from 'next/link';


export default async function MainImportant() {
    const allowedLocales: LocaleT[] = ["uk", "en", "de"];

    const localeRaw = (await cookies()).get('NEXT_LOCALE')?.value || "uk";
    const locale: LocaleT = allowedLocales.includes(localeRaw as LocaleT) ? (localeRaw as LocaleT) : "uk";

    const categories = await fetchCategories(baseUrl, locale);

    return (
        <section className="main-important">
            <div className="container main-important__block">
                <aside className="main-important__aside">
                    <div>
                        <h2 className="main-important__title">
                            Новини
                        </h2>

                        <ul className="main-important__list">
                            {categories.map((category: CategoryI) => (
                                <li className="dropdown__item" key={category.id}>
                                    <Link
                                        href="/"
                                        className="main-important__link"

                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
                <div className="main-important__banner" data-aos="fade-right">
                    <h5>
                        Будьте в курсі<br /> всіх новин з<br /><span className="main-important__span">East Reporter</span>
                    </h5>
                </div>
            </div>
        </section>
    )
}