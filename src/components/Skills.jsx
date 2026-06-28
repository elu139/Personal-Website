import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { skillClusters } from '../data'

const TONES = {
  forest: 'from-sage-light/50 to-sage/30 text-sage-deep dark:from-sage-deep/40 dark:to-sage/20 dark:text-sage-light',
  water: 'from-dusk-light/50 to-dusk/30 text-dusk-deep dark:from-dusk-deep/40 dark:to-dusk/20 dark:text-dusk-light',
  mountain: 'from-blush-lilac/60 to-dusk-light/30 text-dusk-deep dark:from-dusk/40 dark:to-dusk-deep/20 dark:text-dusk-light',
  meadow: 'from-blush-soft/70 to-blush/30 text-stone-600 dark:from-blush/30 dark:to-blush-soft/10 dark:text-blush-soft',
}

function Cluster({ cluster, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[32px] bg-white/60 p-7 shadow-md shadow-sage/10 ring-1 ring-white/50 backdrop-blur dark:bg-night-soft/60 dark:ring-white/5"
    >
      <h4 className="mb-5 font-display text-lg font-semibold text-stone-700 dark:text-stone-100">
        {cluster.name}
      </h4>
      <div className="flex flex-wrap gap-3">
        {cluster.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 + i * 0.06 }}
            className={`pill bg-gradient-to-br ${TONES[cluster.landscape]} shadow-sm`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-anchor relative mx-auto max-w-5xl px-6 py-24 sm:py-32"
    >
      <SectionHeading eyebrow="growing things" title="Skills" />
      <div className="grid gap-6 sm:grid-cols-2">
        {skillClusters.map((c, i) => (
          <Cluster key={c.name} cluster={c} index={i} />
        ))}
      </div>
    </section>
  )
}
