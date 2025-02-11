import { baseUrl } from '@/utils/baseUrl'
import React from 'react'
import Breadcrumbs from '../elements/Breadcrumbs';


export default async function PostTemplate({ post }: { post: PostI }) {
    const categoriesResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?include=${post.categories.join(',')}`);
    const categories = await categoriesResponse.json();
    return (
        <main className="categories-article">
            <div className="container categories-article__container">
                <Breadcrumbs 
                  arr={categories}
                  currentPost={post.title.rendered}
                />
                <div className="categories-article__block">
                    {/* <div className="categories-article__article-wrapper">
                        <?php
                        if (have_posts()):
                        while (have_posts()):
                        the_post(); ?>
                        <?php
                        $current_lang = function_exists('pll_current_language') ? pll_current_language() : 'uk';
                        $category_slugs = array(
                            'interview' => array(
                                'uk' => 'interview',      // Украинский
                                'en' => 'interview-en',     // Английский
                                'de' => 'interview-de'      // Немецкий (пример)
                        )
                        );
                        $interview_slug = isset($category_slugs['interview'][$current_lang]) ? $category_slugs['interview'][$current_lang] : 'interview';
                        if (has_category($interview_slug)): ?>
                        <article id="post-<?php the_ID(); ?>" className="categories-article__article">
                            <h1 className="categories-article__h1"><?php the_title(); ?></h1>

                            <div className="interview__video-container">
                                <?php
                                $content = get_the_content();

                                // Ищем YouTube ссылку в контенте
                                preg_match('/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/', $content, $matches);

                                $video_id = isset($matches[1]) ? esc_attr($matches[1]) : '';

                                // Удаляем YouTube-ссылку из контента
                                if ($video_id) {
                                    $content = preg_replace('/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/', '', $content);
                                    }
                                    ?>

                                <?php if ($video_id): ?>
                                <div className="youtube-placeholder" data-video-id="<?php echo $video_id; ?>">
                                    <img src="https://img.youtube.com/vi/<?php echo $video_id; ?>/maxresdefault.jpg"
                                        alt="Video Thumbnail">
                                        <button className="youtube-play-button" aria-label="Відтворити відео">
                                            <svg style="width: 100px; height: 100px" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M658.2 523.8l-151.9 87.7c-31.6 18.2-71-4.6-71-41V395c0-36.4 39.5-59.2 71-41l151.9 87.7c31.5 18.4 31.5 63.9 0 82.1z"
                                                    fill="#025cc0" />
                                                <path
                                                    d="M533.2 870c-217.2 0-394-176.7-394-394S316 82 533.2 82s394 176.7 394 394-176.8 394-394 394z m0-737.1C344 132.9 190.1 286.8 190.1 476S344 819.1 533.2 819.1 876.3 665.2 876.3 476 722.4 132.9 533.2 132.9z"
                                                    fill="#025cc0" />
                                            </svg>
                                        </button>
                                </div>
                                <?php else: ?>
                                <p>
                                    <?php echo pll__('Відео недоступне') ?>
                                </p>
                                <?php endif; ?>
                            </div>

                            <div className="categories-article__content">
                                <?php
                                // Выводим очищенный контент без видео
                                echo wpautop($content);
                                    ?>
                            </div>
                        </article>

                        <?php
                        else:
                            ?>
                        <article id="post-<?php the_ID(); ?>" className="categories-article__article">
                            <h1 className="categories-article__h1"><?php the_title(); ?></h1>
                            <div className="categories-article__meta">
                                <span className="categories-article__span"><?php the_date(); ?></span>
                                <span className="categories-article__span"><?php the_author(); ?></span>
                            </div>
                            <div className="categories-article__content">
                                <?php the_content(); ?>
                            </div>
                        </article>

                        <?php endif;
                        endwhile;
                        endif;
                ?>
                        <nav className="categories-article__nav categories-article-nav">
                            <?php
                            // Получаем предыдущий пост
                            $prev_post = get_previous_post();
                    if (!empty($prev_post)): ?>
                            <a className="categories-article-nav__item categories-article-nav__item--prev"
                                href="<?php echo get_permalink($prev_post->ID); ?>">
                                <svg className="categories-article-nav__button" focusable="false" aria-hidden="true"
                                    viewBox="0 0 24 24" data-testid="ArrowBackIosIcon">
                                    <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
                                </svg>
                                <h2 className="categories-article-nav__h2 categories-article-nav__h2--small">
                                    <?php echo esc_html($prev_post->post_title); ?>
                                </h2>
                            </a>
                            <?php endif; ?>

                            <?php
                            // Получаем следующий пост
                            $next_post = get_next_post();
                    if (!empty($next_post)): ?>
                            <a className="categories-article-nav__item categories-article-nav__item--next"
                                href="<?php echo get_permalink($next_post->ID); ?>">
                                <h2 className="categories-article-nav__h2 categories-article-nav__h2--small">
                                    <?php echo esc_html($next_post->post_title); ?>
                                </h2>
                                <svg className="categories-article-nav__button" focusable="false" aria-hidden="true"
                                    viewBox="0 0 24 24" data-testid="ArrowForwardIosIcon">
                                    <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                </svg>
                            </a>
                            <?php endif; ?>
                        </nav>

                        <?php
                        $categories = get_the_category();
                        if ($categories) {
                            $category_ids = array();
                        foreach ($categories as $category) {
                            $category_ids[] = $category -> term_id;
                    }

                        $related_posts_args = array(
                        'category__in' => $category_ids,
                        'post__not_in' => array(get_the_ID()),
                        'posts_per_page' => -1,
                        'orderby' => 'rand'
                        );
                }

                        $related_posts_query = new WP_Query($related_posts_args);

                if ($related_posts_query->have_posts()):
                    ?>
                        <h2 className="categories-article__h2">
                            <?php echo pll__('Пов\'язані пости'); ?>
                        </h2>
                        <div className="categories-article__related related-posts">
                            <?php
                        while ($related_posts_query->have_posts()) {
                                $related_posts_query -> the_post(); ?>
                            <a className="related-posts__post" href="<?php the_permalink(); ?>">
                                <?php
                                if (has_post_thumbnail()) {
                                    the_post_thumbnail('medium', ['className' => 'categories-article__img']);
                                } else {
                                    $content = get_the_content();

                                // Ищем YouTube ссылку в контенте
                                preg_match('/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/', $content, $matches);

                                $video_id = isset($matches[1]) ? esc_attr($matches[1]) : '';
                                if ($video_id) {
                                    echo '<img src="https://img.youtube.com/vi/' . esc_attr($video_id) . '/maxresdefault.jpg" className="categories-article__img" alt="Video Thumbnail">';
                                    } else {
                                        echo '<img src="' . get_template_directory_uri() . '/assets/images/default-image.png" className="categories-article__img" alt="Default Image">';
                                    }
                                    
                                }
                                ?>
                                        <h2 className="categories-article__title related-posts__title">
                                            <?php the_title(); ?>
                                        </h2>
                                        <p>
                                            <?php the_date(); ?>
                                        </p>
                                    </a>
                                    <?php }
                                    wp_reset_postdata();
                        ?>
                                </div>
                                <?php endif; ?>
                        </div>

                        <?php get_template_part('/template-parts/common/aside'); ?>
                    </div> */}
                </div>
            </div>
        </main>
    )
}