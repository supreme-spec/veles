import { toursMetadata } from './metadata';

export const metadata = toursMetadata;

import { Breadcrumbs } from '@/shared/components/ui/Breadcrumbs';

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container mx-auto px-4 mt-4 relative z-10">
        <Breadcrumbs />
      </div>
      {children}
    </>
  );
}
