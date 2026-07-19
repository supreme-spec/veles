import Script from 'next/script';
import React from 'react';

interface SchemaScriptsProps {
  schemas: object[];
}

export function SchemaScripts({ schemas }: SchemaScriptsProps) {
  return (
    <>
      {schemas.map((schema, index) => {
        let html = '';
        try {
          html = JSON.stringify(schema);
        } catch (e) {
          console.error('SchemaScripts JSON.stringify error', e, schema);
          html = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Error' });
        }
        return (
          <Script
            key={`schema-${index}`}
            id={`ld-json-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </>
  );
}