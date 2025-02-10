import React from 'react'
import Breadcrumbs from '../elements/Breadcrumbs'
import InterviewComponent from '../modules/InterviewComponents';
import AnouncesComponent from '../modules/AnouncesComponent';
import DefaultCategoryComponent from '../modules/DefaultCategoryComponent';


export default function CategoryPage({ categoryData, posts, slug }: { categoryData: CategoryI[], posts: PostI[] | InterviewPost[], slug: string[] }) {
    const firstSlug = slug[0];
    return (
        <main className="categories">
            <div className="container categories__container">
                <h1 className="categories__h1 h1">
                    {categoryData[0].name}
                </h1>
                <Breadcrumbs
                    arr={categoryData.reverse()}
                />
                {firstSlug === 'interview' ? (
                    <InterviewComponent
                        posts={posts as InterviewPost[]}
                    />
                ) : firstSlug === 'anounces' ? (
                    <AnouncesComponent
                        posts={posts as PostI[]}
                    />
                ) : (
                    <DefaultCategoryComponent
                        posts={posts as PostI[]}
                    />
                )}
            </div>
        </main>
    )
}