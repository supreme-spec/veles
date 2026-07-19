'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    createInfoflotWidget: (url: string, params: { key: string; referer: string }) => void;
    infoflotWidgetLoaded: boolean;
  }
}

export default function InfoflotSearchWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to load Infoflot widget script
    const loadInfoflotWidget = () => {
      if (typeof window !== 'undefined' && !window.infoflotWidgetLoaded) {
        // Check if script is already loaded
        const existingScript = document.querySelector('script[src="https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js"]');
        if (existingScript) {
          // If script exists, try to initialize widget
          if (window.createInfoflotWidget && widgetRef.current) {
            try {
              window.createInfoflotWidget('https://bitrix.infoflot.com/rest/api/search.filter/', {
                key: 'YTo0OntzOjI6IklEIjtzOjQ6IjQxMjkiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6InZ3ZnluZWIxIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=',
                referer: encodeURIComponent(location.href)
              });
              window.infoflotWidgetLoaded = true;
            } catch (error) {
              console.error('Error initializing Infoflot widget:', error);
            }
          }
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js';
        script.async = true;
        script.onload = () => {
          try {
            if (window.createInfoflotWidget && widgetRef.current) {
              window.createInfoflotWidget('https://bitrix.infoflot.com/rest/api/search.filter/', {
                key: 'YTo0OntzOjI6IklEIjtzOjQ6IjQxMjkiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6InZ3ZnluZWIxIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=',
                referer: encodeURIComponent(location.href)
              });
              window.infoflotWidgetLoaded = true;
            }
          } catch (error) {
            console.error('Error initializing Infoflot widget:', error);
          }
        };
        script.onerror = () => {
          console.error('Failed to load Infoflot widget script');
        };
        document.head.appendChild(script);
      } else if (window.infoflotWidgetLoaded && window.createInfoflotWidget) {
        // If already loaded, wait for ref to be available before reinitializing
        let attempts = 0;
        const maxAttempts = 10; // Maximum 10 attempts (1 second total)
        const checkAndInitialize = () => {
          if (widgetRef.current && widgetRef.current.parentNode) {
            try {
              window.createInfoflotWidget('https://bitrix.infoflot.com/rest/api/search.filter/', {
                key: 'YTo0OntzOjI6IklEIjtzOjQ6IjQxMjkiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6InZ3ZnluZWIxIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=',
                referer: encodeURIComponent(location.href)
              });
            } catch (error) {
              console.error('Error reinitializing Infoflot widget:', error);
            }
          } else if (attempts < maxAttempts) {
            // Retry after a short delay if ref is not yet available
            attempts++;
            setTimeout(checkAndInitialize, 100);
          }
        };
        checkAndInitialize();
      }
    };

    loadInfoflotWidget();

    // Cleanup function
    return () => {
      // We don't remove the script as it might be used by other components
    };
  }, []);

  return (
    <div 
      ref={widgetRef}
      className="infoflotWidget" 
      data-id="YTo0OntzOjI6IklEIjtzOjQ6IjQxMjkiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6InZ3ZnluZWIxIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=" 
      data-index="1"
    ></div>
  );
}