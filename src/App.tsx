import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { LanguageProvider } from '@/hooks/useLanguage';
import { ThemeProvider } from '@/hooks/useTheme';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import ProjectsPage from '@/pages/ProjectsPage';
import About from '@/pages/About';
import WhyChooseUs from '@/pages/WhyChooseUs';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projets" element={<ProjectsPage />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/pourquoi-nous-choisir" element={<WhyChooseUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
