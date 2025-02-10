/* eslint-disable @typescript-eslint/no-explicit-any */
interface MenuI {
    items: MenuItemI[];
}


interface MenuSubItemI {
    id: number;
    description: string;
    title: string;
    url: string;
}

interface MenuItemI extends MenuSubItemI {
    children: MenuSubItemI[];
}

interface CategoryI {
    id: number;
    name: string;
    slug: string;
    parent: number;
}

interface InterviewPost {
    id: number;
    content: {
        rendered: string;
        protected: boolean;
    }
    title: {
        rendered: string;
    }
}

interface FeaturedMedia {
    source_url: string;
}

interface AuthorI {
    name: string;
}

interface PostI {
    id: number;
    slug: string;
    date: string;
    categories: number[];
    title: {
        rendered: string;
    }
    content: {
        rendered: string;
    }
    _embedded: {
        "wp:featuredmedia"?: FeaturedMedia[];
        "wp:term"?: any;
        "author": AuthorI[];
    };
}

type LocaleT = "uk" | "en" | "de";