import Link from 'next/link'
import React from 'react'


export default function Breadcrumbs({ arr }: { arr: CategoryI[] }) {

    return (
        <nav className="categories__breadcrumbs">
            <Link href="/" className="categories__link categories__link--breadcrumbs">
                Головна сторінка
            </Link>
            <svg className="categories__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
            </svg>
            {arr.map((category: CategoryI, index: number) => {
                if (index < arr.length - 1) {
                    return (
                        <>
                            <Link key={category.id} href="/" className="categories__link categories__link--breadcrumbs">
                                {category.name}
                            </Link>
                            <svg className="categories__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                fill="none" viewBox="0 0 24 24" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                            </svg>
                        </>
                    )
                } else {
                    return (
                        <Link key={category.id} href="/" className="categories__link categories__link--breadcrumbs">
                            {category.name}
                        </Link>
                    )
                }
            })}
        </nav >
    )
}