import { useEffect } from 'react'
import Icon from './Icon'

type AdventureMapProps = {
  notice: string
  unlockedLevel: number
  completedLevels: number[]
  onBack: () => void
  onSelectLevel: (level: number) => void
  onDismissNotice: () => void
}

const levels = [
  { level: 1, x: 15.9, y: 23.4, title: 'Gerbang Pulau Bentuk' },
  { level: 2, x: 30.2, y: 23.5, title: 'Lembah Bentuk' },
  { level: 3, x: 42, y: 24.9, title: 'Hutan Bentuk' },
]

function AdventureMap({ notice, unlockedLevel, completedLevels, onBack, onSelectLevel, onDismissNotice }: AdventureMapProps) {
  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(onDismissNotice, 3200)
    return () => window.clearTimeout(timeout)
  }, [notice, onDismissNotice])

  return (
    <section className="adventure-map" aria-label="Peta petualangan Pulau Bentuk">
      <div className="adventure-map__artwork">
        <img src="/adventure-map.jpg" alt="Pulau-pulau petualangan bangun datar" />
        <button className="adventure-map__back" type="button" onClick={onBack} aria-label="Kembali ke beranda">
          <Icon name="chevron" />
        </button>
        {levels.map(({ level, x, y, title }) => {
          const completed = completedLevels.includes(level)
          const locked = level > unlockedLevel
          const current = level === unlockedLevel
          return (
            <button
              aria-label={`Level ${level}, ${title}${completed ? ', selesai' : locked ? ', terkunci' : ', terbuka'}`}
              className={`adventure-map__hotspot${locked ? ' is-locked' : ''}${completed ? ' is-completed' : ''}${current ? ' is-current' : ''}`}
              key={level}
              onClick={() => onSelectLevel(level)}
              style={{ left: `${x}%`, top: `${y}%` }}
              type="button"
            >
              <span className="adventure-map__badge">
                {completed ? <span aria-hidden="true">★</span> : level}
                {locked && <span className="adventure-map__lock" aria-hidden="true">🔒</span>}
              </span>
            </button>
          )
        })}
      </div>
      {notice && <button className="adventure-map__notice" onClick={onDismissNotice} type="button">{notice}<span aria-hidden="true"> ×</span></button>}
    </section>
  )
}

export default AdventureMap
