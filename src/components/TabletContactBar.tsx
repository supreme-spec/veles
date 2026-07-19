'use client';

import React from 'react';

const PHONE_DISPLAY = '+7 985 063-51-34';
const PHONE_TEL = '+79850635134';
const TELEGRAM_URL = 'https://t.me/veles_voyage';

export const TabletContactBar: React.FC = () => {
  return (
    <div className="hidden md:flex lg:hidden fixed bottom-4 right-4 z-50 flex-col gap-2">
      <a
        href={`tel:${PHONE_TEL}`}
        className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
        aria-label={`Позвонить ${PHONE_DISPLAY}`}
        title="Позвонить"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.24 1.02l-2.2 2.2z" />
        </svg>
      </a>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Написать в Telegram"
        title="Telegram"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l9.27-3.58c.81-.32 1.55.21 1.22 1.33l-1.92 8.83c-.26 1.2-.98 1.5-1.64.94l-2.2-1.62-1.02 1.02z" />
        </svg>
      </a>
    </div>
  );
};

export default TabletContactBar;
