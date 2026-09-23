import Hero from '@/components/Hero';
import Home from '@/components/Home';
import Layout from '@/layout/RootLayout';

export default function HomePage() {
  return (
    <Layout>
      <main>
        <Hero />
        <Home />
      </main>
    </Layout>
  );
}