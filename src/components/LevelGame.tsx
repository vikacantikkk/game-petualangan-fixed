import { useState } from 'react'
import ExplorerCharacter from './ExplorerCharacter'
import HeroSprite from './HeroSprite'
import obstacleIslandA from '../assets/obstacle-platform-wide.png'
import obstacleIslandB from '../assets/obstacle-platform-small.png'

type Question = {
  symbol: string
  prompt: string
  options: string[]
  answer: string
  explanation: string
  illustration?: 'clock' | 'house' | 'tile' | 'door' | 'bicycle'
}

function QuestionIllustration({ type }: { type: NonNullable<Question['illustration']> }) {
  if (type === 'clock') {
    return (
      <svg viewBox="0 0 160 140" role="img" aria-label="Ilustrasi jam dinding bulat">
        <path d="M66 14h28v12H66z" fill="#9b5b2b" />
        <circle cx="80" cy="76" r="52" fill="#f29a42" />
        <circle cx="80" cy="76" r="43" fill="#fff9dc" stroke="#fff" strokeWidth="4" />
        <path d="M80 42v35l24 14" fill="none" stroke="#315b7e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
        <circle cx="80" cy="76" r="5" fill="#ef8052" />
        <path d="M80 39v5m0 64v5m-37-37h5m64 0h5m-63-26 4 4m45 45 4 4m0-53-4 4m-45 45-4 4" stroke="#d88638" strokeLinecap="round" strokeWidth="3" />
      </svg>
    )
  }

  if (type === 'house') {
    return (
      <svg viewBox="0 0 180 140" role="img" aria-label="Ilustrasi rumah dengan atap segitiga">
        <path d="M26 69 90 18l64 51v12H26z" fill="#ec7543" stroke="#b94e36" strokeLinejoin="round" strokeWidth="5" />
        <path d="M42 70h96v57H42z" fill="#ffe2a1" stroke="#c78546" strokeWidth="4" />
        <path d="M76 91h28v36H76z" fill="#78b8d5" stroke="#fff" strokeWidth="4" />
        <path d="M90 93v32m-12-17h28" stroke="#fff" strokeWidth="3" />
        <path d="M90 19v-8" stroke="#b94e36" strokeLinecap="round" strokeWidth="5" />
      </svg>
    )
  }

  if (type === 'tile') {
    return (
      <svg viewBox="0 0 150 140" role="img" aria-label="Ilustrasi ubin persegi">
        <path d="M75 15 133 45v62l-58 24-58-24V45z" fill="#67b780" stroke="#287d58" strokeLinejoin="round" strokeWidth="5" />
        <path d="M75 15v59m58-29L75 74 17 45m58 29v58" fill="none" stroke="#d8f4cf" strokeLinejoin="round" strokeWidth="4" />
        <path d="m75 34 39 20v40l-39 16-39-16V54z" fill="#98d498" stroke="#e9ffe0" strokeWidth="3" />
      </svg>
    )
  }

  if (type === 'door') {
    return (
      <svg viewBox="0 0 150 150" role="img" aria-label="Ilustrasi pintu berbentuk persegi panjang">
        <path d="M32 17h86v121H32z" fill="#a96c3e" stroke="#75472d" strokeWidth="5" />
        <path d="M43 28h64v110H43z" fill="#d99a58" stroke="#f3c27b" strokeWidth="4" />
        <path d="M52 39h46v87H52z" fill="#c78349" stroke="#edba75" strokeWidth="3" />
        <circle cx="91" cy="84" r="4" fill="#ffe281" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 220 140" role="img" aria-label="Ilustrasi roda sepeda berbentuk lingkaran">
      <circle cx="48" cy="91" r="36" fill="#eaf7ff" stroke="#347ca4" strokeWidth="6" />
      <circle cx="172" cy="91" r="36" fill="#eaf7ff" stroke="#347ca4" strokeWidth="6" />
      <path d="m48 91 45-52 40 52H48l36-38 49 38m-40-52 21 52" fill="none" stroke="#ec7850" strokeLinejoin="round" strokeWidth="6" />
      <path d="M84 39h20m29 52h18m-107 0h-8" stroke="#315b7e" strokeLinecap="round" strokeWidth="6" />
      <circle cx="48" cy="91" r="6" fill="#ec7850" />
      <circle cx="172" cy="91" r="6" fill="#ec7850" />
    </svg>
  )
}

type LevelStage = {
  title: string
  phase: string
  outcome: string
  mission: string
  targets: { name: string; symbol: string }[]
  questions: Question[]
}

type LevelGameProps = {
  level: number
  onBack: () => void
  onComplete: (level: number) => void
}

const levels: LevelStage[] = [
  {
    title: 'Gerbang Pulau Bentuk',
    phase: 'Pengenalan',
    outcome: 'Mengenali segitiga, persegi, dan lingkaran dari tampilannya.',
    mission: 'Temukan 1 segitiga, 1 persegi, dan 1 lingkaran yang tersebar di pulau.',
    targets: [
      { name: 'Segitiga', symbol: '△' },
      { name: 'Persegi', symbol: '□' },
      { name: 'Lingkaran', symbol: '○' },
    ],
    questions: [
      { symbol: '△', prompt: 'Manakah gambar yang berbentuk segitiga?', options: ['○ Lingkaran', '△ Segitiga', '□ Persegi', '▭ Persegi panjang'], answer: '△ Segitiga', explanation: 'Segitiga memiliki tiga sisi dan tiga titik sudut.' },
      { symbol: '○', prompt: 'Bangun datar manakah yang berbentuk bulat?', options: ['△ Segitiga', '□ Persegi', '○ Lingkaran', '▭ Persegi panjang'], answer: '○ Lingkaran', explanation: 'Lingkaran berbentuk bulat dan tidak memiliki sisi lurus.' },
      { symbol: '□', prompt: 'Pilih gambar yang merupakan persegi.', options: ['○ Lingkaran', '△ Segitiga', '□ Persegi', '▭ Persegi panjang'], answer: '□ Persegi', explanation: 'Persegi memiliki empat sisi yang sama panjang.' },
      { symbol: '△', prompt: 'Bentuk apa yang memiliki tiga sisi?', options: ['Lingkaran', 'Persegi', 'Segitiga', 'Persegi panjang'], answer: 'Segitiga', explanation: 'Segitiga mempunyai tiga sisi.' },
      { symbol: '□', prompt: 'Bangun datar apa yang memiliki empat sisi sama panjang?', options: ['Persegi panjang', 'Persegi', 'Segitiga', 'Lingkaran'], answer: 'Persegi', explanation: 'Keempat sisi persegi sama panjang.' },
    ],
  },
  {
    title: 'Lembah Bentuk',
    phase: 'Pemahaman',
    outcome: 'Menyebutkan jumlah sisi dan titik sudut pada bangun datar sederhana.',
    mission: 'Kumpulkan bentuk dengan ciri berbeda: sisi, sudut, dan bentuk tanpa sudut.',
    targets: [
      { name: '3 sisi', symbol: '△' },
      { name: '4 sisi', symbol: '□' },
      { name: 'Titik sudut', symbol: '•' },
    ],
    questions: [
      { symbol: '△', prompt: 'Berapa jumlah sisi pada segitiga?', options: ['2 sisi', '3 sisi', '4 sisi', '5 sisi'], answer: '3 sisi', explanation: 'Segitiga mempunyai tiga sisi.' },
      { symbol: '□', prompt: 'Berapa jumlah titik sudut pada persegi?', options: ['2 titik sudut', '3 titik sudut', '4 titik sudut', 'Tidak ada'], answer: '4 titik sudut', explanation: 'Persegi mempunyai empat titik sudut.' },
      { symbol: '○', prompt: 'Berapa jumlah titik sudut pada lingkaran?', options: ['0 titik sudut', '1 titik sudut', '3 titik sudut', '4 titik sudut'], answer: '0 titik sudut', explanation: 'Lingkaran tidak memiliki titik sudut.' },
      { symbol: '▱', prompt: 'Bangun datar apa yang memiliki empat sisi?', options: ['Lingkaran', 'Segitiga', 'Segi empat', 'Segi lima'], answer: 'Segi empat', explanation: 'Segi empat mempunyai empat sisi.' },
      { symbol: '○', prompt: 'Bangun datar apa yang tidak memiliki titik sudut?', options: ['Persegi', 'Segitiga', 'Persegi panjang', 'Lingkaran'], answer: 'Lingkaran', explanation: 'Lingkaran tidak memiliki titik sudut.' },
    ],
  },
  {
    title: 'Hutan Bentuk',
    phase: 'Penerapan',
    outcome: 'Mengidentifikasi bangun datar pada benda-benda sehari-hari.',
    mission: 'Cari objek di hutan: jam, atap rumah, dan ubin dengan bentuk yang sesuai.',
    targets: [
      { name: 'Jam', symbol: '◷' },
      { name: 'Atap rumah', symbol: '⌂' },
      { name: 'Ubin', symbol: '▧' },
    ],
    questions: [
      { symbol: '◷', illustration: 'clock', prompt: 'Jam dinding berbentuk bulat menyerupai bangun datar apa?', options: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi panjang'], answer: 'Lingkaran', explanation: 'Bentuk jam dinding menyerupai lingkaran.' },
      { symbol: '⌂', illustration: 'house', prompt: 'Atap rumah pada gambar menyerupai bentuk apa?', options: ['Lingkaran', 'Segitiga', 'Persegi', 'Persegi panjang'], answer: 'Segitiga', explanation: 'Bagian atap rumah pada gambar menyerupai segitiga.' },
      { symbol: '▧', illustration: 'tile', prompt: 'Ubin dengan empat sisi sama panjang menyerupai apa?', options: ['Lingkaran', 'Segitiga', 'Persegi', 'Persegi panjang'], answer: 'Persegi', explanation: 'Ubin dengan empat sisi sama panjang menyerupai persegi.' },
      { symbol: '▭', illustration: 'door', prompt: 'Pintu berbentuk persegi panjang memiliki berapa sisi?', options: ['2 sisi', '3 sisi', '4 sisi', '5 sisi'], answer: '4 sisi', explanation: 'Persegi panjang memiliki empat sisi.' },
      { symbol: '○', illustration: 'bicycle', prompt: 'Roda sepeda jika dilihat dari samping berbentuk apa?', options: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi panjang'], answer: 'Lingkaran', explanation: 'Roda berbentuk lingkaran jika dilihat dari samping.' },
    ],
  },
]

const WALK_DURATION = 560
const JUMP_DURATION = 760
const obstacleIslandAssets = [obstacleIslandA, obstacleIslandB]

function playCoinSound() {
  const AudioContextConstructor = window.AudioContext
  if (!AudioContextConstructor) return

  const audio = new AudioContextConstructor()
  const startTime = audio.currentTime
  const volume = audio.createGain()
  volume.gain.setValueAtTime(0.0001, startTime)
  volume.gain.exponentialRampToValueAtTime(0.16, startTime + 0.015)
  volume.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.32)
  volume.connect(audio.destination)

  ;[880, 1320].forEach((frequency, index) => {
    const tone = audio.createOscillator()
    const toneStart = startTime + index * 0.085
    tone.type = 'sine'
    tone.frequency.setValueAtTime(frequency, toneStart)
    tone.connect(volume)
    tone.start(toneStart)
    tone.stop(toneStart + 0.18)
    if (index === 1) tone.onended = () => { void audio.close() }
  })
}

function playAnswerSound(correct: boolean) {
  const AudioContextConstructor = window.AudioContext
  if (!AudioContextConstructor) return

  const audio = new AudioContextConstructor()
  const startTime = audio.currentTime
  const volume = audio.createGain()
  const notes = correct ? [660, 880] : [280, 220]
  volume.gain.setValueAtTime(0.0001, startTime)
  volume.gain.exponentialRampToValueAtTime(0.12, startTime + 0.015)
  volume.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28)
  volume.connect(audio.destination)

  notes.forEach((frequency, index) => {
    const tone = audio.createOscillator()
    const toneStart = startTime + index * 0.09
    tone.type = correct ? 'sine' : 'triangle'
    tone.frequency.setValueAtTime(frequency, toneStart)
    tone.connect(volume)
    tone.start(toneStart)
    tone.stop(toneStart + 0.16)
    if (index === notes.length - 1) tone.onended = () => { void audio.close() }
  })
}

function LevelGame({ level, onBack, onComplete }: LevelGameProps) {
  const stage = levels[Math.min(Math.max(level, 1), levels.length) - 1]
  const challenges = stage.questions
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [heroStep, setHeroStep] = useState(0)
  const [atObstacle, setAtObstacle] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | ''>('')
  const [mistakes, setMistakes] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [collectedCount, setCollectedCount] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [jumping, setJumping] = useState(false)
  const [jumpReady, setJumpReady] = useState(false)
  const [walking, setWalking] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [paused, setPaused] = useState(false)
  const [finished, setFinished] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [status, setStatus] = useState('')
  const question = challenges[challengeIndex]
  const progressCount = atObstacle ? stage.targets.length + challengeIndex : collectedCount
  const totalProgress = stage.targets.length + challenges.length
  const questionProgress = Math.round((progressCount / totalProgress) * 100)
  const obstaclePositions = [[20, 20], [50, 42], [78, 26]]
  const heroPositions = [8, 20, 50, 83]
  const heroHeights = [12, 20, 42, 43]
  const earnedStars = Math.min(3, Math.ceil(score / 200))
  const coinCount = collectedCount * 5 + correctAnswers * 10

  function loseLife(message: string) {
    const remainingLives = lives - 1
    setLives(remainingLives)
    setStatus(message)
    if (remainingLives <= 0) setGameOver(true)
  }

  function moveRight() {
    if (paused || finished || gameOver || atObstacle || walking) return
    if (!jumpReady) {
      loseLife('Aduh, kamu jatuh! Nyawa berkurang. Tekan lompat sebelum maju.')
      setHeroStep(Math.max(0, heroStep - 1))
      return
    }

    const nextStep = Math.min(challenges.length, heroStep + 1)
    if (nextStep === heroStep) return
    setDirection('right')
    setWalking(true)
    setHeroStep(nextStep)
    setJumpReady(false)
    setStatus('')
    if (nextStep > collectedCount) {
      setCollectedCount(nextStep)
      setScore((current) => current + 25)
      playCoinSound()
    }
    window.setTimeout(() => {
      setWalking(false)
      if (nextStep === challenges.length) setAtObstacle(true)
    }, WALK_DURATION)
  }

  function moveLeft() {
    if (paused || finished || gameOver || atObstacle || walking || heroStep === 0) return
    const nextStep = Math.max(0, heroStep - 1)
    setDirection('left')
    setWalking(true)
    setHeroStep(nextStep)
    setJumpReady(false)
    setStatus('')
    window.setTimeout(() => setWalking(false), WALK_DURATION)
  }

  function jump() {
    if (paused || finished || gameOver || atObstacle || jumping || walking) return
    setJumping(true)
    setJumpReady(true)
    setStatus('Lompatan siap! Tekan → untuk mendarat dan mengambil bentuk.')
    window.setTimeout(() => setJumping(false), JUMP_DURATION)
  }

  function answer(option: string) {
    if (!atObstacle || feedback || gameOver) return
    setSelected(option)
    if (option !== question.answer) {
      playAnswerSound(false)
      setMistakes((count) => count + 1)
      setFeedback('wrong')
      setStatus(`Petunjuk: ${question.explanation}`)
      return
    }

    playAnswerSound(true)
    setScore((current) => current + 100)
    setCorrectAnswers((count) => count + 1)
    setFeedback('correct')
    setStatus('')
    window.setTimeout(() => {
      if (challengeIndex === challenges.length - 1) {
        setFinished(true)
        return
      }
      const nextIndex = challengeIndex + 1
      setChallengeIndex(nextIndex)
      setSelected(null)
      setFeedback('')
    }, 700)
  }

  function restart() {
    setChallengeIndex(0)
    setHeroStep(0)
    setAtObstacle(false)
    setSelected(null)
    setFeedback('')
    setMistakes(0)
    setScore(0)
    setLives(3)
    setCollectedCount(0)
    setCorrectAnswers(0)
    setWalking(false)
    setJumping(false)
    setJumpReady(false)
    setDirection('right')
    setFinished(false)
    setGameOver(false)
    setPaused(false)
    setStatus('')
  }

  if (gameOver) {
    return (
      <section className="level-game level-game--result" aria-label={`Permainan berakhir di level ${level}`}>
        <div className="level-game__result-card">
          <div className="level-game__result-banner level-game__result-banner--game-over">Permainan Berakhir</div>
          <ExplorerCharacter />
          <p className="level-game__game-over-message">Nyawamu habis. Coba lagi dan lanjutkan petualanganmu!</p>
          <button className="level-game__continue" onClick={restart} type="button">↻ &nbsp;Ulangi level</button>
          <button className="level-game__retry-level" onClick={onBack} type="button">Kembali ke detail level</button>
        </div>
      </section>
    )
  }

  if (finished) {
    const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1
    return (
      <section className="level-game level-game--result" aria-label={`Hasil level ${level}`}>
        <div className="level-game__result-card">
          <div className="level-game__result-stars" aria-label={`${stars} bintang`}>{Array.from({ length: 3 }, (_, index) => <span key={index}>{index < stars ? '★' : '☆'}</span>)}</div>
          <div className="level-game__result-banner">Level Selesai!</div>
          <ExplorerCharacter />
          <div className="level-game__result-stats">
            <p><span>⭐ Skor</span><strong>{score}</strong></p>
            <p><span>🪙 Koin</span><strong>{coinCount}</strong></p>
            <p><span>✨ XP</span><strong>+100</strong></p>
            <p><span>✅ Jawaban</span><strong>{correctAnswers} benar / {challenges.length}</strong></p>
          </div>
          <button className="level-game__continue" onClick={() => onComplete(level)} type="button">
            {level < levels.length ? 'Lanjut ke level berikutnya' : 'Kembali ke Peta'} <span>→</span>
          </button>
          <button className="level-game__retry-level" onClick={restart} type="button">↻ &nbsp;Ulangi level</button>
        </div>
      </section>
    )
  }

  return (
    <section className="level-game level-game--adventure" aria-label={`Petualangan level ${level}`}>
      <header className="level-game__hud">
        <button className="level-game__pause" onClick={() => setPaused(true)} type="button" aria-label="Jeda permainan">Ⅱ</button>
        <div className="level-game__hud-center"><span>⭐ {score}</span><strong>Level {level}</strong></div>
        <div className="level-game__hud-right">
          <span className="level-game__coins">🪙 {coinCount}</span>
          <span className="level-game__lives" aria-label={`${lives} nyawa tersisa`}>{'❤️'.repeat(lives)}</span>
          <div className="level-game__stars" aria-label={`${earnedStars} dari 3 bintang`}>
            {Array.from({ length: 3 }, (_, index) => <span className={index < earnedStars ? 'is-earned' : ''} key={index}>★</span>)}
          </div>
        </div>
      </header>
      <div className="level-game__progress-row" aria-label={`Progres petualangan ${progressCount} dari ${totalProgress}`}>
        <div className="level-game__progress"><i style={{ width: `${questionProgress}%` }} /></div>
        <strong>{progressCount}/{totalProgress}</strong>
      </div>

      <div className="level-game__scene">
        <div className="level-game__scene-sky" aria-hidden="true" />
        <div className="level-game__route" aria-hidden="true">
          <svg className="level-game__route-path" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 18 82 Q 27 70 36 56 Q 46 58 55 76 Q 64 63 73 49 Q 79 48 84 67" />
          </svg>
          <div className="level-game__course-coins" aria-hidden="true">
            {[[31, 40], [55, 76], [78, 57]].map(([left, bottom], index) => (
              <i className={index < collectedCount ? 'is-collected' : ''} key={index} style={{ left: `${left}%`, bottom: `${bottom}%` }}>🪙</i>
            ))}
          </div>
          <div className="level-game__course-flag" style={{ left: '91%', bottom: '43%' }} aria-label="Tujuan: gerbang soal">
            <span>GERBANG SOAL</span><i /><b>⚑</b>
          </div>
          <div className="level-game__course-obstacles">
          {stage.targets.map((target, index) => (
            <div
              className={`level-game__obstacle is-platform-${index + 1}${index < collectedCount ? ' is-cleared' : ''}${index === collectedCount && !atObstacle ? ' is-active' : ''}`}
              key={target.name}
              style={{ left: `${obstaclePositions[index][0]}%`, bottom: `${obstaclePositions[index][1]}%` }}
            >
              <img className="level-game__obstacle-island" src={obstacleIslandAssets[index % obstacleIslandAssets.length]} alt="" aria-hidden="true" />
              <span className="level-game__obstacle-shape">{index < collectedCount ? '✓' : target.symbol}</span>
              {index >= collectedCount && <b className="level-game__obstacle-coin" aria-hidden="true">🪙</b>}
              <small aria-label={target.name}>{index + 1}</small>
            </div>
          ))}
          </div>
        </div>
        <div
          className={`level-game__hero${jumping ? ' is-jumping' : ''}${walking ? ' is-walking' : ''}`}
          style={{ left: `${heroPositions[Math.min(heroStep, 5)]}%`, bottom: `${heroHeights[Math.min(heroStep, 5)]}%` }}
        >
          <HeroSprite direction={direction} walking={walking} jumping={jumping} />
        </div>

        {!atObstacle ? (
          <div className="level-game__collection-card" role="status">
            <strong>Kumpulkan semua bentuk dan koin!</strong>
            <div className="level-game__collection-progress">
              {stage.targets.map((target, index) => (
                <span className={index < collectedCount ? 'is-collected' : ''} key={target.name} aria-label={target.name}>
                  {index < collectedCount ? '✓' : target.symbol}
                </span>
              ))}
              <b>{collectedCount}/{stage.targets.length}</b>
            </div>
            <small>{status || 'Tekan ↑ untuk melompat, lalu → untuk melewati celah.'}</small>
          </div>
        ) : (
          <article className="level-game__question-card">
            <div className="level-game__question-meta"><span>Soal {challengeIndex + 1} / {challenges.length}</span><span>{stage.title}</span></div>
            <h1>{question.prompt}</h1>
            <div className={`level-game__question-art${question.illustration ? ' level-game__question-art--object' : ''}`} aria-hidden="true">
              {question.illustration ? <QuestionIllustration type={question.illustration} /> : <span>{question.symbol}</span>}
            </div>
            <div className="level-game__answers">
              {question.options.map((option, optionIndex) => {
                const chosen = selected === option
                const right = feedback === 'correct' && option === question.answer
                return (
                  <button
                    className={`level-game__answer is-choice-${optionIndex}${chosen && feedback === 'wrong' ? ' is-wrong' : ''}${right ? ' is-correct' : ''}`}
                    disabled={feedback === 'correct' || feedback === 'wrong'}
                    key={option}
                    onClick={() => answer(option)}
                    type="button"
                  >
                    <span className="level-game__answer-dot">{right ? '✓' : chosen && feedback === 'wrong' ? '×' : ''}</span>{option}
                  </button>
                )
              })}
            </div>
            {feedback === 'correct' && <div className="level-game__feedback is-correct" role="status"><strong>Benar! Kamu mendapat 100 skor dan 10 koin.</strong><span>{question.explanation}</span></div>}
            {feedback === 'wrong' && <div className="level-game__feedback is-wrong" role="status"><strong>{status}</strong><button onClick={() => { setSelected(null); setFeedback(''); setStatus('') }} type="button">Coba lagi</button></div>}
          </article>
        )}
      </div>

      <nav className="level-game__controls" aria-label="Kontrol hero">
        <button onClick={moveLeft} type="button" aria-label="Mundur ke pulau sebelumnya" disabled={atObstacle || walking || heroStep === 0}>←</button>
        <button onClick={moveRight} type="button" aria-label={atObstacle ? 'Pemain tiba di bendera' : 'Maju melewati celah'} disabled={atObstacle || walking}>→</button>
        <button onClick={jump} type="button" aria-label="Lompat melewati celah" disabled={atObstacle || jumping || walking}>↑</button>
      </nav>

      {paused && <div className="level-game__pause-overlay"><div><span>Ⅱ</span><h2>Permainan dijeda</h2><button onClick={() => setPaused(false)} type="button">Lanjut bermain</button><button className="level-game__pause-exit" onClick={onBack} type="button">Kembali ke detail level</button></div></div>}
    </section>
  )
}

export default LevelGame
