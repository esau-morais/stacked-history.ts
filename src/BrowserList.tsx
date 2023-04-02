import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

type Website = {
  name: string
  url: string
}

const websites: Array<Website> = [
  { name: 'Google', url: 'https://www.google.com' },
  { name: 'Facebook', url: 'https://www.facebook.com' },
  { name: 'Twitter', url: 'https://www.twitter.com' },
  { name: 'GitHub', url: 'https://www.github.com' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com' },
]

const containerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
}

export const BrowserList = () => {
  const [showBrowserList, setShowBrowserList] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [websitesList, setWebsitesList] = useState(websites)
  const [zIndexOffset, setZIndexOffset] = useState(0)

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      translateY: '-50%',
      zIndex: 0,
      rotateX: 60,
    },
    show: (i: number) => ({
      opacity: 1,
      scale: 1,
      translateY: `calc(-50% + ${(websitesList.length - 1 - i) * 20}px)`,
      zIndex: websitesList.length - i + zIndexOffset,
      transition: {
        delay: i * 0.05,
        type: 'spring',
        stiffness: 500,
        damping: 20,
      },
      rotateX: 0,
    }),
    exit: {
      opacity: 0,
      scale: 0.9,
      translateY: '-50%',
      zIndex: 0,
      transition: {
        duration: 0.2,
      },
      rotateX: 60,
    },
  }

  const handleCardClick = (i: number) => {
    setHighlightedIndex(i)
    setWebsitesList((prevWebsites) => {
      const websitesCopy = [...prevWebsites]
      const clickedWebsite = websitesCopy.splice(i, 1)
      websitesCopy.push(clickedWebsite[0])
      return websitesCopy
    })
    setZIndexOffset((websitesList.length - 1) * 100)
  }

  const toggleBrowserList = () => {
    setShowBrowserList((prevState) => !prevState)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setShowBrowserList(true)
      } else if (e.key === 'Escape') {
        setShowBrowserList(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AnimatePresence>
      <div className="relative">
        {!showBrowserList && (
          <>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-serif">
              <h1 className="text-3xl font-bold">Stacked Browser History</h1>
              <p className="text-lg">
                Get started{' '}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-200/10 bg-[#1A1A1A]/90 px-1.5 font-mono text-base font-medium text-slate-400 opacity-100 backdrop-blur-md">
                  ⌘ H
                </kbd>
              </p>
            </div>

            <svg
              className="fixed bottom-6 right-[5rem]"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 138 139"
              width="138"
              height="139"
            >
              <rect x="0" y="0" width="138" height="139" fill="none"></rect>
              <g transform="translate(10 10) rotate(0 50 51.5)" stroke="none">
                <path
                  fill="#ffffff"
                  d="M 1.54,-0.25 Q 1.54,-0.25 2.08,3.19 2.62,6.65 3.69,10.64 4.75,14.62 6.06,18.91 7.37,23.21 9.34,28.15 11.32,33.10 13.86,38.04 16.40,42.98 19.73,47.61 23.07,52.24 27.04,56.48 31.01,60.72 35.54,64.51 40.07,68.29 44.84,71.62 49.62,74.94 54.20,77.49 58.78,80.03 62.77,82.28 66.75,84.53 69.93,86.66 73.10,88.79 76.12,90.52 79.13,92.26 81.57,93.57 84.00,94.88 85.86,95.70 87.72,96.52 89.03,96.74 90.34,96.95 92.02,97.49 93.71,98.03 94.75,98.25 95.79,98.47 98.26,99.57 100.73,100.66 101.08,100.84 101.43,101.02 101.71,101.30 101.99,101.58 102.16,101.93 102.34,102.29 102.39,102.68 102.44,103.07 102.36,103.46 102.29,103.85 102.09,104.19 101.89,104.54 101.60,104.80 101.30,105.06 100.94,105.22 100.57,105.37 100.18,105.40 99.78,105.43 99.40,105.33 99.02,105.24 98.68,105.02 98.35,104.81 98.11,104.50 97.86,104.19 97.73,103.81 97.59,103.44 97.58,103.05 97.57,102.65 97.69,102.27 97.81,101.90 98.04,101.58 98.28,101.26 98.60,101.03 98.92,100.80 99.30,100.68 99.68,100.57 100.07,100.58 100.47,100.60 100.84,100.73 101.21,100.87 101.52,101.12 101.82,101.37 102.04,101.71 102.25,102.04 102.34,102.43 102.43,102.81 102.40,103.20 102.36,103.60 102.21,103.96 102.05,104.32 101.78,104.62 101.52,104.91 101.17,105.10 100.83,105.30 100.44,105.37 100.05,105.44 99.66,105.38 99.26,105.33 99.26,105.33 99.26,105.33 97.00,104.29 94.73,103.26 93.70,102.49 92.68,101.73 91.12,100.85 89.56,99.97 88.10,99.47 86.64,98.96 84.70,98.08 82.75,97.20 80.29,95.87 77.82,94.54 74.73,92.76 71.63,90.98 68.54,88.90 65.46,86.83 61.48,84.58 57.50,82.34 52.80,79.73 48.11,77.12 43.23,73.73 38.36,70.34 33.71,66.45 29.06,62.55 24.97,58.19 20.88,53.82 17.43,49.03 13.98,44.23 11.36,39.18 8.75,34.13 6.71,29.08 4.68,24.04 3.32,19.71 1.96,15.38 0.82,11.26 -0.32,7.14 -0.93,3.70 -1.54,0.25 -1.54,0.06 -1.55,-0.11 -1.52,-0.30 -1.48,-0.48 -1.40,-0.65 -1.32,-0.82 -1.20,-0.97 -1.08,-1.12 -0.93,-1.23 -0.78,-1.34 -0.61,-1.42 -0.44,-1.49 -0.25,-1.52 -0.06,-1.56 0.11,-1.54 0.30,-1.53 0.48,-1.47 0.66,-1.41 0.82,-1.31 0.98,-1.21 1.11,-1.07 1.24,-0.94 1.33,-0.78 1.43,-0.61 1.48,-0.43 1.54,-0.25 1.54,-0.25 L 1.54,-0.25 Z"
                ></path>
              </g>
              <g transform="translate(104 92) rotate(0 12 18.5)" stroke="none">
                <path
                  fill="#ffffff"
                  d="M 1.32,-1.65 Q 1.32,-1.65 2.73,-0.47 4.15,0.70 5.63,2.14 7.11,3.58 8.79,5.05 10.47,6.51 12.09,8.06 13.70,9.61 15.20,10.77 16.70,11.93 18.01,13.01 19.32,14.08 20.39,14.71 21.46,15.34 22.70,16.53 23.93,17.71 24.94,19.02 25.96,20.32 26.10,22.09 26.25,23.85 25.16,25.32 24.06,26.79 22.00,27.97 19.94,29.16 17.72,30.67 15.49,32.19 13.27,33.44 11.05,34.69 8.63,36.63 6.21,38.58 5.92,38.73 5.64,38.88 5.32,38.94 5.00,38.99 4.68,38.94 4.36,38.89 4.08,38.74 3.79,38.59 3.57,38.35 3.35,38.12 3.21,37.83 3.07,37.54 3.04,37.21 3.00,36.89 3.07,36.58 3.14,36.26 3.30,35.99 3.47,35.71 3.72,35.50 3.96,35.29 4.26,35.17 4.56,35.05 4.88,35.03 5.20,35.01 5.52,35.10 5.83,35.18 6.09,35.36 6.36,35.54 6.56,35.80 6.75,36.05 6.86,36.36 6.96,36.67 6.96,36.99 6.96,37.31 6.86,37.62 6.76,37.92 6.57,38.18 6.37,38.44 6.11,38.62 5.84,38.80 5.53,38.89 5.22,38.98 4.89,38.96 4.57,38.94 4.27,38.83 3.97,38.71 3.73,38.50 3.48,38.29 3.31,38.02 3.14,37.74 3.07,37.42 3.00,37.11 3.04,36.79 3.07,36.47 3.21,36.17 3.34,35.88 3.56,35.65 3.78,35.41 3.78,35.41 3.78,35.41 6.44,33.46 9.10,31.52 11.06,30.21 13.01,28.90 15.19,27.09 17.36,25.29 19.36,23.99 21.35,22.69 20.99,21.68 20.62,20.67 19.95,19.55 19.28,18.44 18.15,17.57 17.02,16.70 15.87,15.60 14.71,14.51 13.11,13.27 11.50,12.03 9.88,10.63 8.27,9.24 6.39,7.82 4.52,6.41 3.06,5.15 1.59,3.89 0.13,2.77 -1.32,1.65 -1.50,1.47 -1.67,1.28 -1.80,1.06 -1.93,0.84 -2.01,0.60 -2.08,0.36 -2.09,0.10 -2.11,-0.14 -2.06,-0.39 -2.01,-0.65 -1.90,-0.88 -1.80,-1.11 -1.64,-1.31 -1.48,-1.51 -1.27,-1.66 -1.07,-1.82 -0.84,-1.92 -0.60,-2.02 -0.35,-2.07 -0.10,-2.11 0.14,-2.09 0.40,-2.07 0.64,-2.00 0.88,-1.92 1.10,-1.78 1.32,-1.65 1.32,-1.65 L 1.32,-1.65 Z"
                ></path>
              </g>
            </svg>
          </>
        )}

        <button
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700 text-white opacity-75 backdrop-blur-md"
          onClick={toggleBrowserList}
        >
          <span
            role="img"
            aria-label={`${showBrowserList ? 'Close' : 'Open'} browser list`}
          >
            {showBrowserList ? '❌' : '📜'}
          </span>
        </button>
        <motion.div
          key="card-container"
          className="fixed inset-x-0 left-1/2 min-h-screen -translate-x-1/2 transform"
          variants={containerVariants}
          initial="hidden"
          animate={showBrowserList ? 'show' : 'hidden'}
          exit="hidden"
        >
          {websitesList.map((site, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 mx-auto h-[50vh] w-full transform rounded-lg border border-neutral-200/10 bg-[#1A1A1A]/90 p-4 shadow-md backdrop-blur-md"
              variants={cardVariants}
              custom={i}
              onClick={() => handleCardClick(i)}
              style={{
                fontWeight: highlightedIndex === i ? 'bold' : 'normal',
                zIndex: websitesList.length - i + zIndexOffset + 1000,
              }}
            >
              <div className="rounded-lg bg-neutral-800 px-2 py-1.5 font-medium text-neutral-200/40">
                <span role="img" aria-label={`search ${site.name} (read-only)`}>
                  🔍
                </span>
                <span className="ml-1">{site.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
