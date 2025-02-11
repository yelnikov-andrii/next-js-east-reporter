import React from 'react'


export default async function About() {

    return (
        <main className="about">
            <div className="container">
                <h1 className="about__h1 h1">
                    <?php echo get_the_title($page_id); ?>
                </h1>
                <div className="about__content">
                    <?php echo the_content(); ?>
                </div>
            </div>
        </main>
    )
}