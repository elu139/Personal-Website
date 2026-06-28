import { useDarkMode } from './hooks/useDarkMode'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Resume from './components/Resume'
import Playground from './components/Playground'
import Contact from './components/Contact'

// One continuous journey downward through natural landscapes.
const LIGHT_WASH =
  'linear-gradient(180deg, ' +
  '#fcd5b5 0%, ' + /* sky / dawn */
  '#f4a7b9 12%, ' + /* sunrise */
  '#e8c4e0 24%, ' + /* mountain dusk */
  '#cbb9dd 36%, ' +
  '#a8c5a0 52%, ' + /* forest */
  '#9cc3c0 66%, ' + /* water */
  '#b8d4a8 80%, ' + /* garden */
  '#e9e3cf 100%)' /* meadow */

const DARK_WASH =
  'linear-gradient(180deg, ' +
  '#2a2740 0%, ' +
  '#28233c 18%, ' +
  '#241f36 38%, ' +
  '#1f2233 56%, ' +
  '#1b2230 72%, ' +
  '#1d1b2e 100%)'

export default function App() {
  const [dark, toggleDark] = useDarkMode()

  return (
    <div className="relative min-h-screen">
      {/* Continuous landscape wash that spans the full page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{ background: dark ? DARK_WASH : LIGHT_WASH }}
      />
      {/* Soft creamy veil so text stays gentle & readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cream/40 dark:bg-night/50"
      />

      <Nav dark={dark} toggleDark={toggleDark} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Resume />
        <Playground />
        <Contact />
      </main>
    </div>
  )
}
