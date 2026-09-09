export const metadata = {
  title: 'Fitness Tracker',
  description: 'A customizable fitness goal tracker app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
