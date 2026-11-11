import ExplorerCharacter from './ExplorerCharacter'
import levelOneBanner from '../assets/level-1-banner.png'

type LevelIntroProps = {
  level: number
  completed: boolean
  onBack: () => void
  onStart: () => void
}

const levels = [
  {
    title: 'Gerbang Pulau Bentuk',
    phase: 'Pengenalan',
    outcome: 'Mengenali segitiga, persegi, dan lingkaran dari tampilannya.',
    mission: 'Temukan 1 segitiga, 1 persegi, dan 1 lingkaran yang tersebar di pulau.',
    targets: ['△ Segitiga', '□ Persegi', '○ Lingkaran'],
  },
  {
    title: 'Lembah Bentuk',
    phase: 'Pemahaman',
    outcome: 'Menyebutkan jumlah sisi dan titik sudut pada bangun datar sederhana.',
    mission: 'Kumpulkan bentuk dengan ciri berbeda: sisi, sudut, dan bentuk tanpa sudut.',
    targets: ['△ 3 sisi', '□ 4 sisi', '• Titik sudut'],
  },
  {
    title: 'Hutan Bentuk',
    phase: 'Penerapan',
    outcome: 'Mengidentifikasi bangun datar pada benda-benda sehari-hari.',
    mission: 'Cari objek di hutan: jam, atap rumah, dan ubin dengan bentuk yang sesuai.',
    targets: ['◷ Jam', '⌂ Atap rumah', '▧ Ubin'],
  },
]

function LevelIntro({ level, completed, onBack, onStart }: LevelIntroProps) {
  const stage = levels[Math.min(Math.max(level, 1), levels.length) - 1]

  return (
    <section className="level-intro" aria-label={`Detail level ${level}`}>
      <header className="level-intro__header">
        <button className="level-intro__back" type="button" onClick={onBack} aria-label="Kembali ke peta">‹</button>
        <div className="level-intro__resources" aria-label="Skor level 0 bintang dan 0 koin">
          <span><b aria-hidden="true">★</b> 0</span>
          <i aria-hidden="true" />
          <span><b aria-hidden="true">🪙</b> 0</span>
        </div>
      </header>

      <div className="level-intro__title" aria-label={`Level ${level}, ${stage.title}`}>
        {level === 1 ? (
          <img src={levelOneBanner} alt={`Level 1 — ${stage.title}`} />
        ) : (
          <div className="level-intro__plaque">
            <strong>Level {level}</strong>
            <span>{stage.title}</span>
          </div>
        )}
      </div>

      <article className="level-intro__card">
        <h1>{stage.phase} • Capaian Pembelajaran</h1>
        <p className="level-intro__goal">{stage.outcome}</p>
        <h2>Misi Petualangan</h2>
        <p className="level-intro__goal">{stage.mission}</p>
        <ul className="level-intro__targets">
          {stage.targets.map((target) => <li key={target}>{target}</li>)}
        </ul>
      </article>

      <div className="level-intro__stars" aria-label={completed ? 'Level pernah diselesaikan' : 'Tiga bintang tersedia'}>
        {Array.from({ length: 3 }, (_, index) => <span key={index}>★</span>)}
      </div>

      <div className="level-intro__facts">
        <span><b aria-hidden="true">◷</b> 3–5 menit</span>
        <span><b aria-hidden="true">◎</b> 3 bentuk • 5 soal</span>
      </div>

      <div className="level-intro__hero">
        <ExplorerCharacter />
      </div>

      <button className="level-intro__start" type="button" onClick={onStart}>
        Mulai
      </button>
    </section>
  )
}

export default LevelIntro
