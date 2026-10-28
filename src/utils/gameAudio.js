
let audioContext = null

function obterAudioContext() {
  if (typeof window === 'undefined') return null

  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext

  if (!AudioContextClass) return null

  if (!audioContext) {
    audioContext = new AudioContextClass()
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  return audioContext
}

function tocarNota({
  frequencia = 800,
  duracao = 0.1,
  volume = 0.08,
  atraso = 0,
  tipo = 'sine',
  frequenciaFinal = null
} = {}) {
  const contexto = obterAudioContext()
  if (!contexto) return

  const inicio = contexto.currentTime + atraso
  const oscilador = contexto.createOscillator()
  const ganho = contexto.createGain()

  oscilador.type = tipo
  oscilador.frequency.setValueAtTime(frequencia, inicio)

  if (frequenciaFinal !== null) {
    oscilador.frequency.exponentialRampToValueAtTime(
      frequenciaFinal,
      inicio + duracao
    )
  }

  ganho.gain.setValueAtTime(0.001, inicio)
  ganho.gain.exponentialRampToValueAtTime(
    volume,
    inicio + Math.min(0.015, duracao / 3)
  )
  ganho.gain.exponentialRampToValueAtTime(
    0.001,
    inicio + duracao
  )

  oscilador.connect(ganho)
  ganho.connect(contexto.destination)

  oscilador.start(inicio)
  oscilador.stop(inicio + duracao + 0.02)
}

// Bip discreto durante a contagem normal
export function playTick(tempoRestante) {
  if (tempoRestante <= 0) return

  if (tempoRestante > 5) {
    tocarNota({
      frequencia: 880,
      duracao: 0.055,
      volume: 0.045,
      tipo: 'sine'
    })
    return
  }

  // Contagem final: som mais marcado
  tocarNota({
    frequencia: 1100,
    duracao: 0.11,
    volume: 0.09,
    tipo: 'sine'
  })
}

// Som de resposta correcta
export function playCorrect() {
  tocarNota({
    frequencia: 660,
    duracao: 0.1,
    volume: 0.08
  })

  tocarNota({
    frequencia: 990,
    duracao: 0.16,
    volume: 0.09,
    atraso: 0.09
  })
}

// Som de resposta errada
export function playWrong() {
  tocarNota({
    frequencia: 300,
    frequenciaFinal: 210,
    duracao: 0.22,
    volume: 0.09,
    tipo: 'triangle'
  })
}

// Alarme de tempo esgotado
export function playTimeUp() {
  tocarNota({
    frequencia: 880,
    duracao: 0.18,
    volume: 0.12,
    tipo: 'square'
  })

  tocarNota({
    frequencia: 660,
    duracao: 0.18,
    volume: 0.12,
    atraso: 0.2,
    tipo: 'square'
  })

  tocarNota({
    frequencia: 440,
    duracao: 0.32,
    volume: 0.12,
    atraso: 0.4,
    tipo: 'triangle'
  })
}

// Som de vitória
export function playVictory() {
  tocarNota({ frequencia: 523, duracao: 0.15, atraso: 0 })
  tocarNota({ frequencia: 659, duracao: 0.15, atraso: 0.14 })
  tocarNota({ frequencia: 784, duracao: 0.15, atraso: 0.28 })
  tocarNota({
    frequencia: 1047,
    duracao: 0.4,
    volume: 0.1,
    atraso: 0.42
  })
}

