export const fetchCategories = async (baseUrl: string, locale: LocaleT) => {
    const newsSlugObject = {
        'uk': 'news',
        'en': 'news-en',
        'de': 'news-de'
    };

    const categoryNewsResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${newsSlugObject[locale]}&hide_empty=true`, { cache: 'force-cache' });
    const categoryNews = await categoryNewsResponse.json();

    if (!categoryNews.length) {
        throw new Error('Категорія відсутня');
    }

    const categoryId = categoryNews[0].id;

    const childCategoriesResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?parent=${categoryId}&orderby=count&order=desc`, { cache: 'force-cache' });
    const categories = await childCategoriesResponse.json();

    return categories;
};
