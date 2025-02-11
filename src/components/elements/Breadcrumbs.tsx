import { replacebaseUrl } from '@/utils/replaceBaseUrl'
import Link from 'next/link'
import React from 'react'

const Separator = () => {
    return (
        <svg className="categories__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
            fill="none" viewBox="0 0 24 24" >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
        </svg>
    )
}


export default function Breadcrumbs({ arr, currentPost }: { arr: CategoryI[], currentPost?: string }) {
    return (
        <nav className="categories__breadcrumbs">
            <Link href="/" className="categories__link categories__link--breadcrumbs">
                Головна сторінка
            </Link>
            <Separator />
            {arr.map((category: CategoryI, index: number) => {
                if (index < arr.length - 1) {
                    return (
                        <React.Fragment key={category.id}>
                            <Link href={replacebaseUrl(category.link)} className="categories__link categories__link--breadcrumbs">
                                {category.name}
                            </Link>
                            <Separator />
                        </React.Fragment>
                    )
                } else {
                    return (
                        <Link key={category.id} href={replacebaseUrl(category.link)} className="categories__link categories__link--breadcrumbs">
                            {category.name}
                        </Link>
                    )
                }
            })}
            {currentPost && (
                <>
                    {arr.length > 0 && (
                        <Separator />
                    )}
                    <span>
                        {currentPost}
                    </span>
                </>
            )}
        </nav >
    )
}