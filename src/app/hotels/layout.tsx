import { hotelsMetadata } from './metadata';

export const metadata = hotelsMetadata;

export default function HotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
