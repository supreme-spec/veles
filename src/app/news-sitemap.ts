import { SITE_URL } from '@/shared/constants/seo';

/**
 * News Sitemap Generator
 * Generates a sitemap for time-sensitive news content
 * Helps search engines discover and index news articles
 * 
 * Based on Google's news sitemap specification:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
 */

interface NewsEntry {
    title: string;
    publicationDate: Date;
    keywords?: string[];
    stockTickers?: string[];
    name: string;
    language: string;
    access: 'Subscription' | 'Registration' | 'Public';
    genres: ('PressRelease' | 'Satire' | 'Blog' | 'OpEd' | 'Opinion' | 'UserGenerated')[];
}

interface NewsSitemapEntry {
    url: string;
    lastModified?: Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    news?: NewsEntry;
}

export default function newsSitemap(): NewsSitemapEntry[] {
    const baseUrl = SITE_URL;
    // --- Динамические даты для SEO ---
    // Даты публикации и обновления — для динамической подстановки из server component
    const currentDate = new Date();
    const dateOneYearFromNow = new Date();
    dateOneYearFromNow.setFullYear(currentDate.getFullYear() + 1);
    const dateTwoMonthsAgo = new Date();
    dateTwoMonthsAgo.setMonth(currentDate.getMonth() - 2);
    const dateThreeMonthsAgo = new Date();
    dateThreeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    // Create sample news entries for tourism updates
    const sitemap: NewsSitemapEntry[] = [
        {
            url: `${baseUrl}/news/new-tour-packages-2026`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
            news: {
                title: 'Новые туры 2026: Экзотические направления от Велес Вояж',
                publicationDate: dateOneYearFromNow,
                keywords: ['туры 2026', 'экзотические направления', 'новинки', 'путешествия'],
                name: 'Турагентство Велес Вояж',
                language: 'ru',
                access: 'Public',
                genres: ['PressRelease']
            }
        },
        {
            url: `${baseUrl}/news/christmas-travel-deals`,
            lastModified: dateOneYearFromNow,
            changeFrequency: 'daily',
            priority: 0.8,
            news: {
                title: 'Рождественские скидки на туры: до 40% на экзотические направления',
                publicationDate: dateOneYearFromNow,
                keywords: ['рождество', 'скидки', 'туры', 'праздники', 'путешествия'],
                name: 'Турагентство Велес Вояж',
                language: 'ru',
                access: 'Public',
                genres: ['PressRelease']
            }
        },
        {
            url: `${baseUrl}/news/visa-free-travel-expansion`,
            lastModified: dateTwoMonthsAgo,
            changeFrequency: 'weekly',
            priority: 0.7,
            news: {
                title: 'Расширение безвизового туризма: Новые страны без визы для россиян',
                publicationDate: dateTwoMonthsAgo,
                keywords: ['безвизовый туризм', 'визы', 'путешествия', 'новости'],
                name: 'Турагентство Велес Вояж',
                language: 'ru',
                access: 'Public',
                genres: ['PressRelease']
            }
        },
        {
            url: `${baseUrl}/news/cruise-season-update`,
            lastModified: dateThreeMonthsAgo,
            changeFrequency: 'weekly',
            priority: 0.7,
            news: {
                title: 'Сезон круизов 2026: Новые маршруты и специальные предложения',
                publicationDate: dateThreeMonthsAgo,
                keywords: ['круизы', 'море', 'путешествия', 'сезон 2026'],
                name: 'Турагентство Велес Вояж',
                language: 'ru',
                access: 'Public',
                genres: ['PressRelease']
            }
        }
    ];

    // Add news entries for country-specific updates
    const countriesWithNews = [
        // Европа
        { slug: 'albania', name: 'Албания', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}` },
        { slug: 'andorra', name: 'Андорра', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 1).padStart(2, '0')}` },
        { slug: 'armenia', name: 'Армения', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 2).padStart(2, '0')}` },
        { slug: 'avstriya-gid', name: 'Австрия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 3).padStart(2, '0')}` },
        { slug: 'abkhazia', name: 'Абхазия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 4).padStart(2, '0')}` },
        { slug: 'belarus', name: 'Беларусь', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 5).padStart(2, '0')}` },
        { slug: 'belgium', name: 'Бельгия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 6).padStart(2, '0')}` },
        { slug: 'bolgariya-gid', name: 'Болгария', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 7).padStart(2, '0')}` },
        { slug: 'bosnia-herzegovina', name: 'Босния и Герцеговина', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 8).padStart(2, '0')}` },
        { slug: 'vatican', name: 'Ватикан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 9).padStart(2, '0')}` },
        { slug: 'uk', name: 'Великобритания', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 10).padStart(2, '0')}` },
        { slug: 'vengriya-gid', name: 'Венгрия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 11).padStart(2, '0')}` },
        { slug: 'germaniya-gid', name: 'Германия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 12).padStart(2, '0')}` },
        { slug: 'gretsiya-gid', name: 'Греция', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 13).padStart(2, '0')}` },
        { slug: 'denmark', name: 'Дания', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 14).padStart(2, '0')}` },
        { slug: 'iceland', name: 'Исландия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 15).padStart(2, '0')}` },
        { slug: 'ireland', name: 'Ирландия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 16).padStart(2, '0')}` },
        { slug: 'italy', name: 'Италия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 17).padStart(2, '0')}` },
        { slug: 'spain', name: 'Испания', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 18).padStart(2, '0')}` },
        { slug: 'latvia', name: 'Латвия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 19).padStart(2, '0')}` },
        { slug: 'lithuania', name: 'Литва', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 20).padStart(2, '0')}` },
        { slug: 'liechtenstein', name: 'Лихтенштейн', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 21).padStart(2, '0')}` },
        { slug: 'luxembourg', name: 'Люксембург', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 22).padStart(2, '0')}` },
        { slug: 'malta', name: 'Мальта', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 23).padStart(2, '0')}` },
        { slug: 'moldova', name: 'Молдова', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 24).padStart(2, '0')}` },
        { slug: 'monaco', name: 'Монако', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 25).padStart(2, '0')}` },
        { slug: 'netherlands', name: 'Нидерланды', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 26).padStart(2, '0')}` },
        { slug: 'norway', name: 'Норвегия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 27).padStart(2, '0')}` },
        { slug: 'poland', name: 'Польша', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 28).padStart(2, '0')}` },
        { slug: 'portugaliya-gid', name: 'Португалия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 29).padStart(2, '0')}` },
        { slug: 'romania', name: 'Румыния', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 30).padStart(2, '0')}` },
        { slug: 'russia', name: 'Россия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 31).padStart(2, '0')}` },
        { slug: 'san-marino', name: 'Сан-Марино', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 32).padStart(2, '0')}` },
        { slug: 'north-macedonia', name: 'Северная Македония', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 33).padStart(2, '0')}` },
        { slug: 'serbia', name: 'Сербия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 34).padStart(2, '0')}` },
        { slug: 'slovakia', name: 'Словакия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 35).padStart(2, '0')}` },
        { slug: 'slovenia', name: 'Словения', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 36).padStart(2, '0')}` },
        { slug: 'ukraine', name: 'Украина', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 37).padStart(2, '0')}` },
        { slug: 'finland', name: 'Финляндия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 38).padStart(2, '0')}` },
        { slug: 'horvatiya-gid', name: 'Хорватия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 39).padStart(2, '0')}` },
        { slug: 'montenegro', name: 'Черногория', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 40).padStart(2, '0')}` },
        { slug: 'chekhiya-gid', name: 'Чехия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 41).padStart(2, '0')}` },
        { slug: 'switzerland', name: 'Швейцария', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 42).padStart(2, '0')}` },
        { slug: 'sweden', name: 'Швеция', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 43).padStart(2, '0')}` },
        { slug: 'estonia', name: 'Эстония', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 44).padStart(2, '0')}` },
        { slug: 'france', name: 'Франция', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 45).padStart(2, '0')}` },
        { slug: 'bulgaria', name: 'Болгария', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 46).padStart(2, '0')}` },
        { slug: 'cyprus-gid', name: 'Кипр', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 47).padStart(2, '0')}` },
        { slug: 'northern-cyprus', name: 'Северный Кипр', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 48).padStart(2, '0')}` },
        { slug: 'kosovo', name: 'Косово', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 49).padStart(2, '0')}` },
        { slug: 'south-ossetia', name: 'Южная Осетия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 50).padStart(2, '0')}` },
        { slug: 'transnistria', name: 'Приднестровье', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 51).padStart(2, '0')}` },
        { slug: 'artsakh', name: 'Арцах', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 52).padStart(2, '0')}` },
        { slug: 'donetsk', name: 'Донецкая Народная Республика', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 53).padStart(2, '0')}` },
        { slug: 'luhansk', name: 'Луганская Народная Республика', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 54).padStart(2, '0')}` },

        // Азия
        { slug: 'afghanistan', name: 'Афганистан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 55).padStart(2, '0')}` },
        { slug: 'azerbaijan', name: 'Азербайджан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 56).padStart(2, '0')}` },
        { slug: 'bahrain', name: 'Бахрейн', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 57).padStart(2, '0')}` },
        { slug: 'bangladesh', name: 'Бангладеш', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 58).padStart(2, '0')}` },
        { slug: 'bhutan', name: 'Бутан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 59).padStart(2, '0')}` },
        { slug: 'brunei', name: 'Бруней', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 60).padStart(2, '0')}` },
        { slug: 'cambodia', name: 'Камбоджа', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 61).padStart(2, '0')}` },
        { slug: 'georgia', name: 'Грузия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 62).padStart(2, '0')}` },
        { slug: 'indiya-gid', name: 'Индия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 63).padStart(2, '0')}` },
        { slug: 'indoneziya-gid', name: 'Индонезия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 64).padStart(2, '0')}` },
        { slug: 'iran', name: 'Иран', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 65).padStart(2, '0')}` },
        { slug: 'iraq', name: 'Ирак', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 66).padStart(2, '0')}` },
        { slug: 'israel', name: 'Израиль', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 67).padStart(2, '0')}` },
        { slug: 'yaponiya-gid', name: 'Япония', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 68).padStart(2, '0')}` },
        { slug: 'jordan', name: 'Иордания', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 69).padStart(2, '0')}` },
        { slug: 'kazakhstan-gid', name: 'Казахстан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 70).padStart(2, '0')}` },
        { slug: 'kuwait', name: 'Кувейт', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 71).padStart(2, '0')}` },
        { slug: 'kyrgyzstan', name: 'Киргизия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 72).padStart(2, '0')}` },
        { slug: 'laos', name: 'Лаос', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 73).padStart(2, '0')}` },
        { slug: 'lebanon-gid', name: 'Ливан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 74).padStart(2, '0')}` },
        { slug: 'macau', name: 'Макао', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 75).padStart(2, '0')}` },
        { slug: 'malayziya-gid', name: 'Малайзия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 76).padStart(2, '0')}` },
        { slug: 'maldivy-gid', name: 'Мальдивы', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 77).padStart(2, '0')}` },
        { slug: 'mongolia-gid', name: 'Монголия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 78).padStart(2, '0')}` },
        { slug: 'myanmar', name: 'Мьянма', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 79).padStart(2, '0')}` },
        { slug: 'nepal-gid', name: 'Непал', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 80).padStart(2, '0')}` },
        { slug: 'north-korea-gid', name: 'Северная Корея', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 81).padStart(2, '0')}` },
        { slug: 'oman', name: 'Оман', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 82).padStart(2, '0')}` },
        { slug: 'pakistan', name: 'Пакистан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 83).padStart(2, '0')}` },
        { slug: 'palestina-gid', name: 'Палестина', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 84).padStart(2, '0')}` },
        { slug: 'filippiny-gid', name: 'Филиппины', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 85).padStart(2, '0')}` },
        { slug: 'qatar-gid', name: 'Катар', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 86).padStart(2, '0')}` },
        { slug: 'saudi-arabia', name: 'Саудовская Аравия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 87).padStart(2, '0')}` },
        { slug: 'singapur-gid', name: 'Сингапур', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 88).padStart(2, '0')}` },
        { slug: 'uzhnaya-koreya-gid', name: 'Южная Корея', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 89).padStart(2, '0')}` },
        { slug: 'shri-lanka-gid', name: 'Шри-Ланка', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 90).padStart(2, '0')}` },
        { slug: 'siriya-gid', name: 'Сирия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 91).padStart(2, '0')}` },
        { slug: 'taiwan', name: 'Тайвань', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 92).padStart(2, '0')}` },
        { slug: 'tajikistan', name: 'Таджикистан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 93).padStart(2, '0')}` },
        { slug: 'tailand-gid', name: 'Таиланд', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 94).padStart(2, '0')}` },
        { slug: 'timor-leste', name: 'Восточный Тимор', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 95).padStart(2, '0')}` },
        { slug: 'turtsiya-gid', name: 'Турция', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 96).padStart(2, '0')}` },
        { slug: 'turkmenistan', name: 'Туркменистан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 97).padStart(2, '0')}` },
        { slug: 'oae-gid', name: 'ОАЭ', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 98).padStart(2, '0')}` },
        { slug: 'uzbekistan-gid', name: 'Узбекистан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 99).padStart(2, '0')}` },
        { slug: 'vetnam-gid', name: 'Вьетнам', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 100).padStart(2, '0')}` },
        { slug: 'yemen-gid', name: 'Йемен', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 101).padStart(2, '0')}` },

        // Северная Америка
        { slug: 'antigua-barbuda', name: 'Антигуа и Барбуда', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 102).padStart(2, '0')}` },
        { slug: 'bahamas', name: 'Багамы', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 103).padStart(2, '0')}` },
        { slug: 'barbados', name: 'Барбадос', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 104).padStart(2, '0')}` },
        { slug: 'belize', name: 'Белиз', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 105).padStart(2, '0')}` },
        { slug: 'canada', name: 'Канада', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 106).padStart(2, '0')}` },
        { slug: 'kosta-rika-ekologicheskaya-respublika-gid', name: 'Коста-Рика', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 107).padStart(2, '0')}` },
        { slug: 'kuba-respublika-gid', name: 'Куба', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 108).padStart(2, '0')}` },
        { slug: 'dominica', name: 'Доминика', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 109).padStart(2, '0')}` },
        { slug: 'dominican-republic', name: 'Доминиканская Республика', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 110).padStart(2, '0')}` },
        { slug: 'el-salvador', name: 'Сальвадор', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 111).padStart(2, '0')}` },
        { slug: 'grenada', name: 'Гренада', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 112).padStart(2, '0')}` },
        { slug: 'guatemala', name: 'Гватемала', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 113).padStart(2, '0')}` },
        { slug: 'haiti', name: 'Гаити', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 114).padStart(2, '0')}` },
        { slug: 'honduras', name: 'Гондурас', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 115).padStart(2, '0')}` },
        { slug: 'jamaica', name: 'Ямайка', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 116).padStart(2, '0')}` },
        { slug: 'mexico', name: 'Мексика', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 117).padStart(2, '0')}` },
        { slug: 'nicaragua-gid', name: 'Никарагуа', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 118).padStart(2, '0')}` },
        { slug: 'panama-gid', name: 'Панама', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 119).padStart(2, '0')}` },
        { slug: 'saint-kitts-and-nevis', name: 'Сент-Китс и Невис', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 120).padStart(2, '0')}` },
        { slug: 'saint-lucia', name: 'Сент-Люсия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 121).padStart(2, '0')}` },
        { slug: 'saint-vincent-and-the-grenadines', name: 'Сент-Винсент и Гренадины', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 122).padStart(2, '0')}` },
        { slug: 'trinidad-and-tobago', name: 'Тринидад и Тобаго', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 123).padStart(2, '0')}` },
        { slug: 'ssha-gid', name: 'США', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 124).padStart(2, '0')}` },

        // Южная Америка
        { slug: 'argentina', name: 'Аргентина', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 125).padStart(2, '0')}` },
        { slug: 'bolivia', name: 'Боливия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 126).padStart(2, '0')}` },
        { slug: 'brazil', name: 'Бразилия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 127).padStart(2, '0')}` },
        { slug: 'chile', name: 'Чили', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 128).padStart(2, '0')}` },
        { slug: 'colombia', name: 'Колумбия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 129).padStart(2, '0')}` },
        { slug: 'ecuador', name: 'Эквадор', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 130).padStart(2, '0')}` },
        { slug: 'guyana', name: 'Гайана', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 131).padStart(2, '0')}` },
        { slug: 'paraguay', name: 'Парагвай', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 132).padStart(2, '0')}` },
        { slug: 'peru-gid', name: 'Перу', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 133).padStart(2, '0')}` },
        { slug: 'suriname', name: 'Суринам', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 134).padStart(2, '0')}` },
        { slug: 'uruguay', name: 'Уругвай', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 135).padStart(2, '0')}` },
        { slug: 'venesuela-angel-tepuy-neft-karaibskie-plyazhi-gid', name: 'Венесуэла', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 136).padStart(2, '0')}` },

        // Африка
        { slug: 'egypt', name: 'Египет', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 137).padStart(2, '0')}` },
        { slug: 'burkina-faso', name: 'Буркина-Фасо', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 138).padStart(2, '0')}` },
        { slug: 'burundi', name: 'Бурунди', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 139).padStart(2, '0')}` },
        { slug: 'cabo-verde', name: 'Кабо-Верде', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 140).padStart(2, '0')}` },
        { slug: 'comoros', name: 'Коморы', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 141).padStart(2, '0')}` },
        { slug: 'congo', name: 'Конго', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 142).padStart(2, '0')}` },
        { slug: 'dr-congo', name: 'ДР Конго', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 143).padStart(2, '0')}` },
        { slug: 'djibouti', name: 'Джибути', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 144).padStart(2, '0')}` },
        { slug: 'equatorial-guinea', name: 'Экваториальная Гвинея', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 145).padStart(2, '0')}` },
        { slug: 'eritrea', name: 'Эритрея', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 146).padStart(2, '0')}` },
        { slug: 'eswatini', name: 'Эсватини', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 147).padStart(2, '0')}` },
        { slug: 'ethiopia', name: 'Эфиопия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 148).padStart(2, '0')}` },
        { slug: 'gabon', name: 'Габон', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 149).padStart(2, '0')}` },
        { slug: 'gambia', name: 'Гамбия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 150).padStart(2, '0')}` },
        { slug: 'ghana', name: 'Гана', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 151).padStart(2, '0')}` },
        { slug: 'guinea', name: 'Гвинея', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 152).padStart(2, '0')}` },
        { slug: 'guinea-bissau', name: 'Гвинея-Бисау', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 153).padStart(2, '0')}` },
        { slug: 'kenya', name: 'Кения', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 154).padStart(2, '0')}` },
        { slug: 'lesotho', name: 'Лесото', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 155).padStart(2, '0')}` },
        { slug: 'liberia', name: 'Либерия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 156).padStart(2, '0')}` },
        { slug: 'libya', name: 'Ливия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 157).padStart(2, '0')}` },
        { slug: 'madagascar', name: 'Мадагаскар', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 158).padStart(2, '0')}` },
        { slug: 'malawi', name: 'Малави', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 159).padStart(2, '0')}` },
        { slug: 'mali', name: 'Мали', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 160).padStart(2, '0')}` },
        { slug: 'mauritania', name: 'Мавритания', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 161).padStart(2, '0')}` },
        { slug: 'mauritius', name: 'Маврикий', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 162).padStart(2, '0')}` },
        { slug: 'morocco', name: 'Марокко', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 163).padStart(2, '0')}` },
        { slug: 'mozambique', name: 'Мозамбик', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 164).padStart(2, '0')}` },
        { slug: 'namibia', name: 'Намибия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 165).padStart(2, '0')}` },
        { slug: 'niger', name: 'Нигер', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 166).padStart(2, '0')}` },
        { slug: 'nigeria', name: 'Нигерия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 167).padStart(2, '0')}` },
        { slug: 'rwanda', name: 'Руанда', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 168).padStart(2, '0')}` },
        { slug: 'sao-tome-and-principe', name: 'Сан-Томе и Принсипи', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 169).padStart(2, '0')}` },
        { slug: 'senegal', name: 'Сенегал', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 170).padStart(2, '0')}` },
        { slug: 'seychelles', name: 'Сейшельские Острова', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 171).padStart(2, '0')}` },
        { slug: 'sierra-leone', name: 'Сьерра-Леоне', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 172).padStart(2, '0')}` },
        { slug: 'somalia', name: 'Сомали', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 173).padStart(2, '0')}` },
        { slug: 'south-africa', name: 'ЮАР', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 174).padStart(2, '0')}` },
        { slug: 'yuzhnyi-sudan-gid', name: 'Южный Судан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 175).padStart(2, '0')}` },
        { slug: 'sudan', name: 'Судан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 176).padStart(2, '0')}` },
        { slug: 'tanzania', name: 'Танзания', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 177).padStart(2, '0')}` },
        { slug: 'togo', name: 'Того', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 178).padStart(2, '0')}` },
        { slug: 'tunisia', name: 'Тунис', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 179).padStart(2, '0')}` },
        { slug: 'uganda', name: 'Уганда', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 180).padStart(2, '0')}` },
        { slug: 'zambia', name: 'Замбия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 181).padStart(2, '0')}` },
        { slug: 'zimbabwe', name: 'Зимбабве', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 182).padStart(2, '0')}` },
        { slug: 'zapadnaya-sahara-gid', name: 'Западная Сахара', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 183).padStart(2, '0')}` },
        { slug: 'somaliland', name: 'Сомалиленд', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 184).padStart(2, '0')}` },
        { slug: 'botswana', name: 'Ботсвана', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 185).padStart(2, '0')}` },
        { slug: 'benin', name: 'Бенин', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 186).padStart(2, '0')}` },
        { slug: 'angola', name: 'Ангола', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 187).padStart(2, '0')}` },
        { slug: 'algeria', name: 'Алжир', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 188).padStart(2, '0')}` },
        { slug: 'cameroon', name: 'Камерун', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 189).padStart(2, '0')}` },
        { slug: 'central-african-republic', name: 'ЦАР', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 190).padStart(2, '0')}` },
        { slug: 'chad', name: 'Чад', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 191).padStart(2, '0')}` },
        { slug: 'cote-d-ivoire', name: 'Кот-д’Ивуар', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 192).padStart(2, '0')}` },
        { slug: 'south-sudan', name: 'Южный Судан', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 192).padStart(2, '0')}` },

        // Океания
        { slug: 'australia', name: 'Австралия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 193).padStart(2, '0')}` },
        { slug: 'fiji', name: 'Фиджи', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 194).padStart(2, '0')}` },
        { slug: 'kiribati', name: 'Кирибати', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 195).padStart(2, '0')}` },
        { slug: 'marshall-islands', name: 'Маршалловы Острова', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 196).padStart(2, '0')}` },
        { slug: 'micronesia', name: 'Микронезия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 197).padStart(2, '0')}` },
        { slug: 'nauru-gid', name: 'Науру', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 198).padStart(2, '0')}` },
        { slug: 'new-zealand-gid', name: 'Новая Зеландия', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 199).padStart(2, '0')}` },
        { slug: 'palau-gid', name: 'Палау', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 200).padStart(2, '0')}` },
        { slug: 'papua-novaya-gvineya-plemennoy-raj-gid', name: 'Папуа-Новая Гвинея', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 201).padStart(2, '0')}` },
        { slug: 'samoa', name: 'Самоа', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 202).padStart(2, '0')}` },
        { slug: 'solomonovy-ostrova-melaneziya-gid', name: 'Соломоновы Острова', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 203).padStart(2, '0')}` },
        { slug: 'tonga', name: 'Тонга', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 204).padStart(2, '0')}` },
        { slug: 'tuvalu', name: 'Тувалу', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 205).padStart(2, '0')}` },
        { slug: 'vanuatu-gid', name: 'Вануату', date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 206).padStart(2, '0')}` }
    ];

    for (const country of countriesWithNews) {
        sitemap.push({
            url: `${baseUrl}/news/${country.slug}-travel-update`,
            lastModified: new Date(), // Using current date for dynamic updates
            changeFrequency: 'weekly',
            priority: 0.6,
            news: {
                title: `Обновления по туризму в ${country.name}: Новые достопримечательности и маршруты`,
                publicationDate: new Date(), // Using current date for dynamic updates
                keywords: [country.name, 'туризм', 'обновления', 'путешествия', 'достопримечательности'],
                name: 'Турагентство Велес Вояж',
                language: 'ru',
                access: 'Public',
                genres: ['PressRelease']
            }
        });
    }

    return sitemap;
}

/**
 * Google News Sitemap Specification:
 * 
 * <url>
 *   <loc>https://example.com/article1.html</loc>
 *   <news:news>
 *     <news:publication>
 *       <news:name>The Example Times</news:name>
 *       <news:language>en</news:language>
 *     </news:publication>
 *     <news:access>Subscription</news:access>
 *     <news:genres>PressRelease, Blog</news:genres>
 *     <news:publication_date>2008-12-23</news:publication_date>
 *     <news:title>Companies A, B in Merger Talks</news:title>
 *     <news:keywords>business, merger, acquisition, A, B</news:keywords>
 *     <news:stock_tickers>NASDAQ:A, NASDAQ:B</news:stock_tickers>
 *   </news:news>
 * </url>
 * 
 * Note: Next.js will automatically convert this to proper XML format
 * when accessed via /news-sitemap.xml
 * 
 * Important: News sitemaps are limited to 1000 URLs
 * and should only include content published in the last 2 days
 * for optimal indexing by Google News.
 */