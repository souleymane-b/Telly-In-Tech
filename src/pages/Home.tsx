import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Projects from '@/components/home/Projects';
import Testimonials from '@/components/home/Testimonials';
import Team from '@/components/home/Team';
import Partners from '@/components/home/Partners';
import CTABanner from '@/components/home/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <WhyChooseUs />
      <Projects />
      <Testimonials />
      {/* <Team /> */}
      <Partners />
      <CTABanner />
    </>
  );
}
