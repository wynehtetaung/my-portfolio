import { useTranslation } from "react-i18next";
import ThreeBackground from "./components/ThreeBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { SECTION_SPACING, Z_INDEX } from "./constants";

function App() {
  const { t } = useTranslation();
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <ThreeBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer
        className={`bg-slate-800 py-6 sm:py-8 relative`}
        style={{ zIndex: Z_INDEX.ELEVATED }}
      >
        <div className={SECTION_SPACING.CONTAINER}>
          <div className="text-center">
            <p className="text-slate-400 text-sm sm:text-base">
              {t("footer.copyright", {
                year,
                name: "Wyne Htet",
              })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
