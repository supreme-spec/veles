'use client';

import { useEffect, useState } from 'react';

export default function ClientInfoflotWidget() {
  const [isClient, setIsClient] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load script manually with better error handling
  useEffect(() => {
    if (!isClient) return;
    
    const script = document.createElement('script');
    script.src = 'https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Infoflot script loaded');
      setScriptLoaded(true);
      // Small delay to ensure the function is available
      setTimeout(() => {
        if (typeof (window as any).createInfoflotWidget === 'function') {
          (window as any).createInfoflotWidget('https://bitrix.infoflot.com/rest/api/search.filter/', {
            key: 'YTo0OntzOjI6IklEIjtzOjQ6IjQxMjkiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6InRkb2ZhODA3IjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=',
            referer: encodeURIComponent(location.href)
          });
          console.log('Infoflot widget initialized successfully');
        } else {
          console.error('createInfoflotWidget function not available after script load');
        }
      }, 100);
    };
    
    script.onerror = () => {
      console.error('Failed to load Infoflot script');
    };
    
    document.head.appendChild(script);
    
    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [isClient]);

  return (
    <div 
      className="infoflotWidget" 
      data-id="YTo0OntzOjI6IklEIjtzOjQ6IjQxMjkiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6InRkb2ZhODA3IjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=" 
      data-index="1"
      style={{ minHeight: '200px' }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '200px', 
        color: '#666',
        fontSize: '14px'
      }}>
        {scriptLoaded ? 'Поисковик загружается...' : 'Инициализация...'}
      </div>
    </div>
  );
}