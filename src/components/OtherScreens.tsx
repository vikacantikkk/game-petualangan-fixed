import type { NavigationItem } from './BottomNavigation'

type ScreenTab = Exclude<NavigationItem, 'Beranda' | 'Peta'>
type OtherScreensProps = {
  tab: ScreenTab
  stars: number
  unlockedLevel: number
  completedLevels: number[]
}

const lessons = [
  { title: 'Gerbang Pulau Bentuk', range: 'Level 1 • Pengenalan', detail: 'Kenali segitiga, persegi, dan lingkaran dari tampilannya.' },
  { title: 'Lembah Bentuk', range: 'Level 2 • Pemahaman', detail: 'Pelajari jumlah sisi dan titik sudut bangun datar sederhana.' },
  { title: 'Hutan Bentuk', range: 'Level 3 • Penerapan', detail: 'Temukan bangun datar pada jam, atap rumah, dan ubin.' },
]

function OtherScreens({ tab, stars, unlockedLevel, completedLevels }: OtherScreensProps) {
  if (tab === 'Materi') {
    return (
      <section className="content-screen" aria-label="Materi bangun datar">
        <p className="content-screen__eyebrow">Belajar sambil menjelajah</p>
        <h1>Materi Bangun Datar</h1>
        <p className="content-screen__intro">Pelajari bangun datar dalam tiga tahap petualangan.</p>
        <div className="content-screen__cards">
          {lessons.map((lesson, index) => (
            <article className="content-card" key={lesson.title}>
              <span className="content-card__number">{index + 1}</span>
              <div><strong>{lesson.title}</strong><small>{lesson.range}</small><p>{lesson.detail}</p></div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (tab === 'Prestasi') {
    return (
      <section className="content-screen" aria-label="Prestasi pemain">
        <p className="content-screen__eyebrow">Terus kumpulkan bintang</p>
        <h1>Prestasi</h1>
        <div className="achievement-summary">
          <div><span>⭐</span><strong>{stars}</strong><small>Bintang</small></div>
          <div><span>🏁</span><strong>{completedLevels.length}/3</strong><small>Level selesai</small></div>
          <div><span>🗺️</span><strong>{unlockedLevel}/3</strong><small>Level terbuka</small></div>
        </div>
        <article className="content-card achievement-card">
          <span className="achievement-card__icon">🏅</span>
          <div><strong>Penjelajah Bangun Datar</strong><small>{completedLevels.length >= 3 ? 'Hebat! Semua level selesai.' : `Selesaikan ${3 - completedLevels.length} level lagi untuk menuntaskan peta.`}</small></div>
        </article>
      </section>
    )
  }

  return (
    <section className="content-screen" aria-label="Profil pemain">
      <p className="content-screen__eyebrow">Petualang bangun datar</p>
      <h1>Profil</h1>
      <article className="profile-card">
        <div className="profile-card__avatar">R</div>
        <div><small>Siswa</small><strong>Rizki</strong><span>Level terbuka {unlockedLevel} dari 3</span></div>
      </article>
      <div className="achievement-summary profile-summary">
        <div><span>⭐</span><strong>{stars}</strong><small>Total bintang</small></div>
        <div><span>🎯</span><strong>{completedLevels.length}</strong><small>Level selesai</small></div>
      </div>
    </section>
  )
}

export default OtherScreens
