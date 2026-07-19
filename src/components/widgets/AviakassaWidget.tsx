'use client';

import { useEffect } from 'react';

interface AviakassaWidgetProps {
  id?: string;
  channelToken?: string;
  showAvia?: boolean;
  showRail?: boolean;
  showHotel?: boolean;
}

export default function AviakassaWidget({
  id = '9878',
  channelToken = '4da1c0bd1b87e6a72d79478ca5686792ff58108b',
  showAvia = false,
  showRail = true,
  showHotel = true,
}: AviakassaWidgetProps) {
  useEffect(() => {
    const scriptId = `ak-app-script-${id}`;
    const existingScript = document.getElementById(scriptId);
    if (existingScript) return;

    const script = document.createElement('script');
    script.defer = true;
    script.id = scriptId;
    script.charset = 'utf-8';
    script.src = 'https://widgets.aviakassa.com/partner.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    script.addEventListener('load', function () {
      // @ts-ignore
      new Aviakassa.Partner(`ak-app-${id}`, {
        showAvia,
        showRail,
        showHotel,
        showAviaTitle: false,
        showRailTitle: false,
        showHotelTitle: false,
        aviaTitle: 'Поиск дешевых авиабилетов',
        railTitle: '',
        hotelTitle: '',
        showAviakassaLogo: false,
        showLocaleSelect: true,
        aviaShowComplexRoute: true,
        showAviaAirlinesPrefilter: true,
        channelToken,
        id: Number(id),
      });
    });

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [id, channelToken, showAvia, showRail, showHotel]);

  return <div id={`ak-app-${id}`} />;
}
