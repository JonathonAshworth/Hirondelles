// AudioContext, AudioBuffer
const playSound = function (audioContext, sound, time) {
    const audioSource = audioContext.createBufferSource()
    audioSource.buffer = sound
    audioSource.connect(audioContext.destination)
    audioSource.start(time)
}

const createSoundConstructor = audioContext => (sound, length) => {
    const numSamples = audioContext.sampleRate * length
    const data = new Float32Array(numSamples)
    for(let i = 0; i < numSamples; i++) {
        data[i] = sound(i / audioContext.sampleRate)
    }
    const audioBuffer = audioContext.createBuffer(1, numSamples, audioContext.sampleRate)
    audioBuffer.copyToChannel(data, 0)
    return audioBuffer
}

// Frequency, VolumeFunction => (Time => Sample)
const beep = (frequency, volume) => x => Math.sin(2 * Math.PI * x * frequency) * volume(x)



const inverseLinear = x => n => x - (x * n)


const compose = (...beeps) => x => beeps.reduce((sum, beep) => sum + beep(x), 0) / beeps.length



const ctx = new AudioContext()
const soundConstructor = createSoundConstructor(ctx)


const bell = (frequency) => soundConstructor(compose(
    beep(frequency, inverseLinear(1)),
    beep(frequency * 2, inverseLinear(0.6)),
    beep(frequency * 3, inverseLinear(0.4)),
    beep(frequency * 4.2, inverseLinear(0.25)),
    beep(frequency * 5.4, inverseLinear(0.2)),
    beep(frequency * 6.8, inverseLinear(0.15)),
), 1)

const notes4 = [440, 466.16, 493.88, 523.25, 554.37, 587.33,
                622.25, 659.25, 698.46, 739.99, 783.99, 830.61]
const notes5 = notes4.map(n => n * 2)

const bells4 = notes4.map(n => bell(n))
const bells5 = notes5.map(n => bell(n))


const start = ctx.currentTime
playSound(ctx, bells4[0], start)
playSound(ctx, bells4[2], start + 0.2)
playSound(ctx, bells4[3], start + 0.4)
playSound(ctx, bells4[5], start + 0.6)
playSound(ctx, bells4[7], start + 0.8)
playSound(ctx, bells4[8], start + 1)
playSound(ctx, bells4[10], start + 1.2)
playSound(ctx, bells5[0], start + 1.4)
playSound(ctx, bells4[10], start + 1.6)
playSound(ctx, bells4[9], start + 1.8)
playSound(ctx, bells4[7], start + 2)
playSound(ctx, bells4[5], start + 2.2)
playSound(ctx, bells4[4], start + 2.4)
playSound(ctx, bells4[2], start + 2.6)
playSound(ctx, bells4[0], start + 2.8)
