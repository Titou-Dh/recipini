import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import PopularRecipes from '@/components/landing/PopularRecipes';
import Testimonials from '@/components/landing/Testimonials';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <PopularRecipes />
      <Testimonials />
    </>
  );
}
