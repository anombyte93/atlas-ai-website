import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Manager | Atlas AI',
  description: 'Manage your website content',
};

export default function AdminPage() {
  return (
    <>
      <div id="nc-root" />
      <Script
        id="decap-cms-script"
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
    </>
  );
}
