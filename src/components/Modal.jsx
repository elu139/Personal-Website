import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/40 p-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-cream p-8 shadow-2xl dark:bg-night-soft"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-4 text-2xl leading-none text-stone-400 transition-colors hover:text-stone-700 dark:hover:text-stone-100"
            >
              &times;
            </button>
            {title && (
              <h3 className="mb-4 pr-8 font-display text-2xl font-semibold text-stone-700 dark:text-stone-100">
                {title}
              </h3>
            )}
            <div className="text-stone-600 dark:text-stone-300">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
