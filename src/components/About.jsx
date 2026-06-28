import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import BotanicalAccent from '../design/BotanicalAccent'

export default function About() {
  return (
    <section
      id="about"
      className="section-anchor relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      {/* PLACEHOLDER FOR CLAUDE DESIGN — botanical accent */}
      <BotanicalAccent className="absolute right-4 top-10 hidden h-32 w-24 opacity-70 lg:block" />

      <SectionHeading eyebrow="a clearing in the woods" title="About Me" />

      <div className="grid items-center gap-12 md:grid-cols-[320px_1fr]">
        <Reveal className="flex flex-col items-center gap-6">
          <img
            src="/extra/IMG_2180.jpg"
            alt="Ethan Lu"
            className="blob h-64 w-64 object-cover shadow-xl shadow-sage/20 ring-4 ring-white/60 dark:ring-white/10"
          />
          <img
            src="/extra/20250707_174546_E4C9DF.JPEG"
            alt="Ethan Lu in Prague"
            className="blob-2 h-56 w-56 object-cover shadow-xl shadow-dusk/20 ring-4 ring-white/60 dark:ring-white/10"
            style={{ objectPosition: 'center 20%' }}
          />
        </Reveal>

        <Reveal delay={0.15} className="space-y-5">
          <h3 className="font-display text-2xl font-semibold text-stone-700 dark:text-stone-100">
            Computer Science Student &amp; Future Builder
          </h3>
          <p className="leading-relaxed text-stone-600 dark:text-stone-300">
            Hello! I'm a 2nd Year Computer Science student at Georgia Tech with a deep
            fascination for building our future through data science, AI, and other
            miscellaneous tech media. What piques my interest in computer science is the
            opportunity to bridge the liminal space between "no longer" and "not yet" —
            bringing our stories, aspirations, and dreams to life through code. I've chosen a
            path of innovation that optimizes human experience, streamlines everyday
            activities, and empowers people to achieve their goals.
          </p>
          <p className="leading-relaxed text-stone-600 dark:text-stone-300">
            My approach to development is guided by being gritty, adaptable, and human (I'm
            not a robot!). I've had the privilege of working across various domains — from
            education technology to climate awareness platforms — always with the goals of
            enhancing user experiences and creating measurable impact.
          </p>
          <p className="leading-relaxed text-stone-600 dark:text-stone-300">
            When I'm AFK, you'll find me staying active through playing and watching soccer
            (go Leeds! #LUFC), tennis, ping pong, or running (I ran the 2025 Publix Atlanta
            Marathon). I also love traveling and immersing myself in new cultures, and I've
            recently discovered a passion for cooking — just ask any of my friends about my
            tiramisu. My long-term vision is to position myself where I can build empowering
            technology that makes a positive difference in people's lives and contributes to
            a better future for everyone.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
