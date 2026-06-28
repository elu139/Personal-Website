import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Modal from './Modal'
import { projects, experience } from '../data'

function Card({ item, index, onModal }) {
  const isLink = !!item.link
  const Wrapper = isLink ? motion.a : motion.button
  const wrapperProps = isLink
    ? { href: item.link, target: '_blank', rel: 'noreferrer' }
    : { onClick: () => onModal(item.modal), type: 'button' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="group flex flex-col overflow-hidden rounded-[28px] bg-white/70 shadow-lg shadow-sage/10 ring-1 ring-white/50 backdrop-blur transition-shadow duration-300 hover:shadow-2xl hover:shadow-sage/25 dark:bg-night-soft/70 dark:ring-white/5"
    >
      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-sage-light/40 to-dusk-light/40 p-6 dark:from-sage-deep/30 dark:to-dusk-deep/30">
        <img
          src={item.image}
          alt={item.title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-display text-lg font-semibold text-stone-700 dark:text-stone-100">
          {item.title}
        </h4>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          {item.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="pill bg-sage-light/30 text-xs text-sage-deep dark:bg-dusk/30 dark:text-dusk-light"
            >
              {tag}
            </span>
          ))}
        </div>
        <Wrapper
          {...wrapperProps}
          className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-semibold text-sage-deep transition-colors hover:text-dusk dark:text-dusk-light dark:hover:text-blush"
        >
          {item.linkLabel} <span aria-hidden>→</span>
        </Wrapper>
      </div>
    </motion.div>
  )
}

const MODALS = {
  climate: {
    title: 'The Climate Reality Project',
    body: (
      <p>
        I was involved in the development of the Climate Reality Project's youth chapter in
        New Jersey website during high school. Unfortunately, due to external factors, the
        website and codebase have since been shut down.
      </p>
    ),
  },
  investment: {
    title: 'Investment Portfolio Scoring Framework',
    body: (
      <p>
        The Investment Management Club at Georgia Tech currently employs private usage and
        sharing of its financial models.
      </p>
    ),
  },
  c21u: {
    title: 'Data-Driven Education at C21U Lab',
    body: (
      <>
        <p>
          I was involved as the lead ML + Data Engineer of the Discussion Forums subteam,
          which sought to leverage Georgia Tech's EdStem course data to improve instructors'
          abilities to understand students' comments and concerns. The codebase is restricted
          within GT's GitHub Enterprise due to the research's use of PII data. Below is a
          poster presentation of what my team accomplished, which I presented at the
          Undergraduate Research Symposium in April 2025.
        </p>
        <a
          href="/DDE_UROP_Apr2025.pdf"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block rounded-xl border-2 border-sage px-5 py-2 font-semibold text-sage-deep transition-colors hover:bg-sage hover:text-white dark:border-dusk-light dark:text-dusk-light dark:hover:bg-dusk dark:hover:text-white"
        >
          Poster
        </a>
      </>
    ),
  },
}

export default function Projects() {
  const [modal, setModal] = useState(null)

  return (
    <section
      id="projects"
      className="section-anchor relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <SectionHeading eyebrow="stones along the path" title="Projects" />

      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Card key={p.title} item={p} index={i} onModal={setModal} />
        ))}
      </div>

      <Reveal className="mb-10 mt-20">
        <h3 className="text-center font-display text-2xl font-semibold text-stone-700 dark:text-stone-100">
          Experience
        </h3>
      </Reveal>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {experience.map((e, i) => (
          <Card key={e.title} item={e} index={i} onModal={setModal} />
        ))}
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal ? MODALS[modal].title : ''}>
        {modal && MODALS[modal].body}
      </Modal>
    </section>
  )
}
