import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  countryName: string;
  faqs?: FAQItem[];
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ countryName, faqs }) => {
  // Default FAQ items optimized for conversational queries (voice search, AI assistants)
  const defaultFAQs: FAQItem[] = [
    {
      question: `Нужна ли виза в ${countryName} для россиян в 2026?`,
      answer: `Визовые требования для граждан РФ зависят от ${countryName}. Для точной информации проверьте актуальные данные в разделе "Визы и документы" путеводителя. Турагентство "Велес Вояж" (РТА 0035678) оказывает помощь в оформлении документов.`
    },
    {
      question: `Сколько стоит тур в ${countryName} на двоих в 2026?`,
      answer: `Стоимость тура в ${countryName} зависит от сезона, длительности и класса отеля. Актуальные цены и специальные предложения уточняйте у специалистов "Велес Вояж" по телефону +7 985 063-51-34.`
    },
    {
      question: `Какая валюта в ${countryName} и где лучше обменять?`,
      answer: `В ${countryName} используется местная валюта. Рекомендуется обменять часть средств в России, а часть - на месте в официальных обменных пунктах для лучшего курса.`
    },
    {
      question: `Когда лучше ехать в ${countryName} по цене и погоде?`,
      answer: `Лучшее время для поездки в ${countryName} - это период с мягким климатом и умеренными ценами. Подробную информацию о сезонах и погоде смотрите в разделе "География и климат".`
    },
    {
      question: `Как добраться до ${countryName} из России?`,
      answer: `В ${countryName} можно добраться самолетом, поездом или автобусом в зависимости от расстояния. Конкретные варианты и маршруты уточняйте в разделе "Транспорт" путеводителя.`
    },
    {
      question: `Безопасно ли путешествовать в ${countryName} в 2026?`,
      answer: `${countryName} в целом безопасна для туристов при соблюдении стандартных мер предосторожности. Рекомендуется оформить страховку и ознакомиться с рекомендациями в разделе "Безопасность".`
    },
    {
      question: `Что нужно взять с собой в поездку в ${countryName}?`,
      answer: `Для поездки в ${countryName} потребуются документы, одежда по сезону, личные вещи и аптечка. Полный список рекомендаций смотрите в разделе "Подготовка к поездке".`
    },
    {
      question: `Можно ли платить картой в ${countryName}?`,
      answer: `В ${countryName} банковские карты принимаются в большинстве мест, но рекомендуется иметь наличные для мелких расходов. Проверьте актуальную информацию в путеводителе.`
    },
    {
      question: `Какие достопримечательности ${countryName} стоит посетить в первую очередь?`,
      answer: `В ${countryName} множество интересных мест. Подробный список основных достопримечательностей с описаниями и советами найдете в соответствующем разделе путеводителя.`
    },
    {
      question: `Где остановиться в ${countryName} - отели или апартаменты?`,
      answer: `Выбор жилья в ${countryName} зависит от бюджета и предпочтений. В путеводителе есть рекомендации по отелям, апартаментам и другим вариантам размещения.`
    }
  ];

  const faqItems = faqs || defaultFAQs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema, null, 2) }}
    />
  );
};