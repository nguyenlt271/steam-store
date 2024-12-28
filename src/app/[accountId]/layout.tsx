import BaseLayout from '@/components/layout/BaseLayout';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
