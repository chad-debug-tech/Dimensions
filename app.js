// Audio System for Dimensional Odyssey - Ye naam mene 15 min phele sochaa hain :p
class AudioSystem {
    constructor() {
        this.audioContext = null
        this.enabled = true
        this.currentOscillators = [] // ye oscillators kabhi kabhi khud hi bajne lagte hain, ghostly vibes ✨
        this.masterGain = null
        this.audioElement = null
        this.currentTrack = null
        this.tracks = [{
                name: "1D - Point",
                url: "/audio/1d.mp3",
                startTime: 3, // 0:03 - perfect spot, trust me I listened 47 times
            },
            {
                name: "2D - Flatland",
                url: "/audio/2d.mp3",
                startTime: 0, // 0:00 - starting from the very beginning, like my debugging sessions
            },
            {
                name: "3D - Reality",
                url: "/audio/maintheme.mp3",
                startTime: 10, // 0:10 - because the first 10 seconds were too mainstream
            },
            {
                name: "4D - Tesseract",
                url: "/audio/4d.mp3",
                startTime: 7, // 0:07 - lucky number? idk man, sounds cool
            },
            {
                name: "5D - Penteract",
                url: "/audio/5d.mp3",
                startTime: 5, // 0:05 - by this point user's brain is already melting anyway
            },
        ]
        this.transitionUrl = "/audio/translation.mp3" // Transition sound effect - ye load ho rhaa pr play karne se mana kar de rhaa 
            //TODO: Handle audio loading errors gracefully. if doesn't load, then WE ARE DEAD  :(
            // Update: Still not dead yet, miracle ho gaya! 
    }


    init() {
        try {
            // Praying to the audio gods 🙏🕯️
            this.audioContext = new(window.AudioContext || window.webkitAudioContext)()
            this.masterGain = this.audioContext.createGain()
            this.masterGain.connect(this.audioContext.destination)
            this.masterGain.gain.value = 0.3 // Not too loud, neighbors ko complaint nahi karni

            this.audioElement = document.getElementById("audio-element")
            if (this.audioElement) {
                this.audioElement.volume = 0.7 // Sweet spot between "can't hear" and "MY EARS!"
            }
            // Message : Audio context initialized successfully. i wish gng
            // Narrator: It actually worked. He couldn't believe it.
        } catch (e) {
            // pls ye mat aananaa :(
            // Narrator: It came. It always comes.
            console.error("[v0] Audio context initialization failed:", e)
                // F in the chat bois 
        }
    }

    toggle() {
        if (!this.audioContext) return this.enabled // no audio context? no problem! (actually big problem but shhh)
        this.enabled = !this.enabled
        this.masterGain.gain.value = this.enabled ? 0.3 : 0 // the most powerful on/off switch ever written
        return this.enabled
    }

    stopAll() {
        // SILENCE! I KILL YOU! - in the voice of that one comedian
        this.currentOscillators.forEach((osc) => {
            try {
                osc.stop()
            } catch (e) {
                // oscillator already dead, can't kill what's already dead 
            }
        })
        this.currentOscillators = [] // genocide complete
    }

    playDimensionAmbience(dimension) {
        this.stopAll() // First we destroy, then we create. Circle of life 
        if (!this.enabled) return // if a tree falls in the forest and audio is disabled, does it make a sound?

        const track = this.tracks[dimension]
        if (track && this.audioElement) {
            this.audioElement.src = track.url
            this.audioElement.currentTime = track.startTime
            this.audioElement.play().catch((e) => console.error("[v0] Music playback failed:", e))
                // "User hasn't interacted with document yet" - browser's favorite excuse
        }
    }

    playTransition() {
        if (!this.enabled || !this.audioContext) return // no context, no party 
        if (this.audioElement) {
            this.audioElement.src = this.transitionUrl
            this.audioElement.currentTime = 0 // reset like my will to code after seeing a merge conflict
            this.audioElement.play().catch((e) => console.error("[v0] Transition audio failed:", e))
        }
    }

    playLonelySpace() {
        // Playing the song of my people (solo developers) 😢
        const osc = this.audioContext.createOscillator()
        const gain = this.audioContext.createGain()

        osc.type = "sine" // smooth like my brain after 4 hours of coding
        osc.frequency.value = 110
        gain.gain.value = 0.1 // barely audible, like my confidence during code review

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.start() // And so it begins...
        this.currentOscillators.push(osc)
    }

    playGeometricBeeps() {
        // Math go beep boop 🤖
        const frequencies = [220, 277, 330, 440] // the sacred tones of geometry
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                    this.playBeep(freq, 0.3)
                }, i * 500) // stagger them like my work-life balance
        })
    }

    playBeep(frequency, duration) {
        if (!this.enabled) return // ninja mode activated 🥷

        const osc = this.audioContext.createOscillator()
        const gain = this.audioContext.createGain()

        osc.type = "square" // be there or be square, we chose square
        osc.frequency.value = frequency
        gain.gain.value = 0.05 // smol beep, no scare user

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.start()
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration)
        osc.stop(this.audioContext.currentTime + duration)
            // Perfectly timed beep. Unlike my life decisions.
    }

    playMindBending() {
        // *inception BWAAAAAM sound*
        const osc = this.audioContext.createOscillator()
        const gain = this.audioContext.createGain()

        osc.type = "sawtooth" // sharp like my anxiety when production breaks
        osc.frequency.value = 55 // starting low, just like my expectations
        gain.gain.value = 0.08

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.frequency.exponentialRampToValueAtTime(110, this.audioContext.currentTime + 4)
            // Slowly ascending, like my caffeine dependency

        osc.start()
        this.currentOscillators.push(osc)
    }

    playGlitchChaos() {
        // When reality.exe stops working
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const randomFreq = Math.random() * 500 + 200
                this.playBeep(randomFreq, 0.1)
                    // Random beeps = peak chaos = my code after 2am
            }, i * 200)
        }
    }

    playError() {
        if (!this.enabled || !this.audioContext) return
            // The sound of defeat 📢
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.playBeep(150, 0.2) // ERROR ERROR ERROR
            }, i * 250)
        }
        // Achievement Unlocked: Made it beep angrily 🏆
    }
}

// ye hoga background particle system ka code 5th dimension mein use kara hai isko 
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById("particles")
        this.ctx = this.canvas.getContext("2d") // 2D context for 5D visualization. Ironic? Yes. Working? Also yes.
        this.particles = []
        this.resize()
        this.init()

        window.addEventListener("resize", () => this.resize())
            // Because users love to resize windows during intense dimensional experiences
    }

    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
            // Stretching like me after 8 hours of sitting
    }

    init() {
        for (let i = 0; i < 100; i++) {
            // Spawning 100 particles like spawning 100 bugs in production
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5, // random velocity x
                vy: (Math.random() - 0.5) * 0.5, // random velocity y
                size: Math.random() * 2 + 1,
                //  lets stop talking abt ts code gng :p
                // We don't talk about TypeScript. No, no, no 🎵
            })
        }
    }


    //     javascript mein animation loop kaise banate hain :p 
    update() {
        // The classic "fade trail" effect - works 60% of the time, every time
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.particles.forEach((p) => {
            p.x += p.vx // move particle
            p.y += p.vy // move particle more

            // Bounce off walls like my motivation bounces between "I can do this" and "why did I choose coding"
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1

            this.ctx.fillStyle = "rgba(0, 212, 255, 0.5)" // that cyberpunk blue ✨
            this.ctx.beginPath()
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2) // Draw a smol circle
            this.ctx.fill()
                //   this.ctx.closePath() - ye close karne ki zarurat nahi hai arc ke baad :p
                // Fun fact: I spent 3 hours debugging before realizing this ^
        })

        requestAnimationFrame(() => this.update())
            // Recursive call! Stack overflow? Nah, browser's got our back 💪
    }
}

// Main Application Class - dekhte hain kitna manage kar paate hain isme :3
// Narrator: They did not manage well.
class DimensionalOdyssey {
    constructor() {
            this.currentDimension = 0 // Starting from the bottom now we're here
            this.scene = null
            this.camera = null
            this.renderer = null
            this.objects = [] // Array of things that will probably leak memory
            this.isAnimating = false
            this.audioSystem = new AudioSystem()
            this.monitorTransformed = false
            this.animationFrameIds = []

            this.cameraControls = {
                forward: false,
                backward: false,
                left: false,
                right: false,
                up: false,
                down: false,
                mouseX: 0,
                mouseY: 0,
                lastMouseX: 0,
                lastMouseY: 0,
                pitch: 0,
                yaw: 0, // Yaw? More like "YAAAS" when it works..sybau
                joystickX: 0,
                joystickY: 0,
            }

            this.dimensions = [{
                    name: "1ST DIMENSION",
                    description: "The Lonely Point",
                    info: "In the first dimension, there is only position on a single line. No width, no height - just a point that can move forward or backward.",
                    // Literally a point. We made a whole dimension for a point. Let that sink in.
                },
                {
                    name: "2ND DIMENSION",
                    description: "Flatland Universe",
                    info: "The second dimension adds width. Shapes can now be drawn: lines, triangles, squares. Imagine living on a flat piece of paper with no concept of 'up'.",
                    // Flat earthers' dream dimension
                },
                {
                    name: "3RD DIMENSION",
                    description: "Our Reality",
                    info: "Welcome to our world! The third dimension adds depth. Objects have length, width, and height. We can walk around things and see all sides.",
                    // Home sweet home. Where bugs exist in 3D glory 🐛
                },
                {
                    name: "4TH DIMENSION",
                    description: "The Tesseract",
                    info: "The fourth spatial dimension is beyond our perception. A tesseract (4D cube) passes through our 3D world like a 3D sphere passes through Flatland.",
                    // If you understand this, you're either a genius or lying
                },
                {
                    name: "5TH DIMENSION",
                    description: "The Penteract",
                    info: "A 5D cube with nested hyperdimensions. This represents the incomprehensible - geometry that exists in five spatial dimensions, visualized through projection.",
                    // At this point we're just making stuff up and hoping math agrees
                },
            ]

            this.init()
        }
        // Initialization function to set up Three.js, event listeners, and start the first dimension
        //  ye function bahut bada ho gaya hai :p
        // TODO: Break down into smaller functions if it gets any bigger - Poornav
        //    Note: Abhi ke liye theek hai ye :p


    init() {
        this.setupThreeJS()
        this.setupEventListeners() // Because users insist on interacting
        this.createDimension(0) // Let there be... a point!

        const particles = new ParticleBackground()
        particles.update() // Particles go brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

        setTimeout(() => {
                document.getElementById("loading-screen").classList.add("hidden")
                    // 3 seconds should be enough to look professional
            }, 3000) //5 kardo isko pls

        this.setupCameraControls() // WASD warriors assemble!
        this.detectMobileDevice() // Detecting mobile users (the brave souls)
    }

    // Three.js setup - Illegal toh nhi hai na ye
    // Nahiin hai :p
    // But it should be, this much power shouldn't be free 💪
    setupThreeJS() {
        const container = document.getElementById("canvas-container")
        this.scene = new window.THREE.Scene()
        this.scene.background = new window.THREE.Color(0x0a0a0f) // Dark mode supremacy 🌙

        this.camera = new window.THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000)
        this.camera.position.z = 3 // Not too close, not too far, just right (Goldilocks approved)

        this.renderer = new window.THREE.WebGLRenderer({
            antialias: true, // Make it smooth like butter
            alpha: true, // Transparency because we fancy
        })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio) // Retina display users rejoice!
        container.appendChild(this.renderer.domElement)

        const light = new window.THREE.DirectionalLight(0xffffff, 0.8)
        light.position.set(5, 5, 5) // Up in the sky, like my expectations
        this.scene.add(light)

        const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.4)
        this.scene.add(ambientLight) // Ambient vibes only 😎

        window.addEventListener("resize", () => this.onWindowResize())
            // Handle resize because users are chaotic

        this.animate() // And... ACTION! 🎬
    }

    onWindowResize() {
        // When users can't decide if they want fullscreen or not
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix() // Math intensifies
        this.renderer.setSize(window.innerWidth, window.innerHeight)
            // Successfully handled resize. Give me a medal 🏅
    }

    // note chad-debug-tech : ye animate function bahut important hai
    // Translation: This function is the heart of everything. Break it and we all die.
    clearScene() {
        // Marie Kondo-ing the entire scene ✨
        this.objects.forEach((obj) => {
            if (obj.geometry) obj.geometry.dispose() // Goodbye geometry
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach((m) => m.dispose()) // Multiple materials? Dispose ALL of them!
                } else {
                    obj.material.dispose() // Single material? You're gone too buddy
                }
            }
            this.scene.remove(obj) // YEET
        })
        this.objects = [] // Empty array = empty mind = zen 🧘

        this.animationFrameIds.forEach((id) => cancelAnimationFrame(id))
        this.animationFrameIds = [] // Cancel all subscriptions, we're starting fresh

        const hint = document.querySelector(".control-hint")
        if (hint) hint.remove() // Remove hints like removing my doubts (they come back)
        document.getElementById("joystick-container").classList.remove("active")
            // Joystick: "My time has come to an end"
    }

    setupCameraControls() {
        // Setting up WASD like it's 1999 and we're playing Quake
        document.addEventListener("keydown", (e) => {
            if (this.currentDimension === 4) { // Only in 4D because we're fancy
                const key = e.key.toLowerCase()
                if (key === "w") this.cameraControls.forward = true // W for "Where am I going?"
                if (key === "s") this.cameraControls.backward = true // S for "Send me back!"
                if (key === "a") this.cameraControls.left = true // A for "Ahhh wrong way"
                if (key === "d") this.cameraControls.right = true // D for "Different direction please"
                if (key === " ") this.cameraControls.up = true // Space = up, because physics
                if (key === "control") this.cameraControls.down = true // Control your descent
            }
        })

        document.addEventListener("keyup", (e) => {
            // Releasing keys like releasing my stress (temporarily)
            const key = e.key.toLowerCase()
            if (key === "w") this.cameraControls.forward = false
            if (key === "s") this.cameraControls.backward = false
            if (key === "a") this.cameraControls.left = false
            if (key === "d") this.cameraControls.right = false
            if (key === " ") this.cameraControls.up = false
            if (key === "control") this.cameraControls.down = false
                // All keys released. We're floating in space now.
        })

        document.addEventListener("mousemove", (e) => {
            if (this.currentDimension === 4) {
                // Mouse movement math that definitely didn't take 5 Stack Overflow tabs
                const deltaX = e.clientX - this.cameraControls.lastMouseX
                const deltaY = e.clientY - this.cameraControls.lastMouseY

                this.cameraControls.yaw -= deltaX * 0.01 // Turn left/right
                this.cameraControls.pitch -= deltaY * 0.01 // Look up/down

                // Clamp pitch so we don't do a 360 noscope and break the matrix
                this.cameraControls.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.cameraControls.pitch))
            }

            this.cameraControls.lastMouseX = e.clientX
            this.cameraControls.lastMouseY = e.clientY
        })

        this.setupJoystickControls() // For our mobile friends (the real MVPs)
    }

    setupJoystickControls() {
        // Virtual joystick because not everyone has a gaming PC
        const joystickContainer = document.getElementById("joystick-container")
        const joystickInner = joystickContainer.querySelector(".joystick-inner")

        let isJoystickActive = false
        const baseRadius = 60 // Big enough to use, small enough to not be annoying
        const innerRadius = 25

        joystickContainer.addEventListener("touchstart", (e) => {
            isJoystickActive = true
            e.preventDefault() // No default behavior allowed here
                // Joystick: "It's my time to shine!" ✨
        })

        joystickContainer.addEventListener("touchmove", (e) => {
            if (!isJoystickActive) return // Not active? Not interested.

            const touch = e.touches[0]
            const rect = joystickContainer.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            let deltaX = touch.clientX - centerX
            let deltaY = touch.clientY - centerY

            // Calculate distance using Pythagorean theorem (thanks ancient Greece!)
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            const maxDistance = baseRadius - innerRadius

            if (distance > maxDistance) {
                // Don't let the joystick escape its bounds (unlike my code scope)
                const angle = Math.atan2(deltaY, deltaX)
                deltaX = Math.cos(angle) * maxDistance
                deltaY = Math.sin(angle) * maxDistance
            }

            joystickInner.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`

            // Normalize to -1 to 1 range because we're civilized
            this.cameraControls.joystickX = deltaX / maxDistance
            this.cameraControls.joystickY = -deltaY / maxDistance // Inverted Y axis (like my sleep schedule)
        })

        joystickContainer.addEventListener("touchend", () => {
            isJoystickActive = false
            joystickInner.style.transform = "translate(-50%, -50%)" // Return to center, like my focus at 3am
            this.cameraControls.joystickX = 0
            this.cameraControls.joystickY = 0
                // Joystick: "My work here is done" *flies away*
        })
    }

    detectMobileDevice() {
        // The world's most comprehensive mobile detection (it's not)
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        if (isMobile) {
            const hint = document.querySelector(".control-hint")
            if (hint) hint.textContent = "Use joystick to move, swipe to look"

        }
    }

    updateCameraMovement() {
        if (this.currentDimension !== 4) return

        const speed = 0.2 // Not too fast, not too slow, perfectly balanced (as all things should be)
        const direction = new window.THREE.Vector3()

        // Calculate forward and right vectors (vector math goes brrr 📐)
        const forward = new window.THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion)
        const right = new window.THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion)

        // WASD movement with joystick fallback (covering all bases like a pro)
        if (this.cameraControls.forward || this.cameraControls.joystickY > 0.2) {
            direction.addScaledVector(forward, speed) // Full speed ahead! ⛵
        }
        if (this.cameraControls.backward || this.cameraControls.joystickY < -0.2) {
            direction.addScaledVector(forward, -speed) // Reverse! Reverse!
        }
        if (this.cameraControls.left || this.cameraControls.joystickX < -0.2) {
            direction.addScaledVector(right, -speed) // Strafe left like a pro gamer
        }
        if (this.cameraControls.right || this.cameraControls.joystickX > 0.2) {
            direction.addScaledVector(right, speed) // Strafe right, dodge those bugs
        }
        if (this.cameraControls.up) {
            direction.y += speed // Ascending like my blood pressure during debugging
        }
        if (this.cameraControls.down) {
            direction.y -= speed // Descending into madness
        }

        this.camera.position.add(direction) // Actually move the camera

        // Apply rotation using Euler angles (sounds fancy, is fancy)
        const euler = new window.THREE.Euler(this.cameraControls.pitch, this.cameraControls.yaw, 0, "YXZ")
        this.camera.quaternion.setFromEuler(euler)
            // Quaternions: The forbidden knowledge that makes 3D rotation actually work
            // Don't ask me to explain them, I just know they work 
    }
    setupEventListeners() {
        this.audioSystem.init()

        document.getElementById("start-btn").addEventListener("click", () => {
            document.getElementById("start-screen").classList.add("hidden")
            this.audioSystem.playDimensionAmbience(0)
            document.getElementById("crt-overlay").classList.add("active")
        })

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") this.nextDimension()
            if (e.key === "ArrowLeft") this.prevDimension()
        })

        document.querySelectorAll(".progress-dot").forEach((dot) => {
            dot.addEventListener("click", () => {
                const index = Number.parseInt(dot.dataset.index)
                this.goToDimension(index)
            })
        })
    }

    createDimension(index) {
        this.clearScene()

        this.camera.position.set(0, 0, 3)

        this.cameraControls.pitch = 0
        this.cameraControls.yaw = 0
        this.cameraControls.forward = false
        this.cameraControls.backward = false
        this.cameraControls.left = false
        this.cameraControls.right = false
        this.cameraControls.up = false
        this.cameraControls.down = false

        this.camera.quaternion.set(0, 0, 0, 1)

        switch (index) {
            case 0:
                this.create1D()
                break
            case 1:
                this.create2D()
                break
            case 2:
                this.create3D()
                break
            case 3:
                this.camera.position.z = 5
                this.create4D()
                break
            case 4:
                this.camera.position.z = 5
                this.create5D()
                break
        }

        this.updateUI(index)
    }

    create1D() {
        const geometry = new window.THREE.SphereGeometry(0.2, 32, 32)
        const material = new window.THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 1,
        })
        const point = new window.THREE.Mesh(geometry, material)
        this.scene.add(point)
        this.objects.push(point)

        const glowGeometry = new window.THREE.SphereGeometry(0.4, 32, 32)
        const glowMaterial = new window.THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.3,
        })
        const glow = new window.THREE.Mesh(glowGeometry, glowMaterial)
        this.scene.add(glow)
        this.objects.push(glow)

        let scale = 1
        let growing = true
        const pulse = () => {
            if (this.currentDimension === 0) {
                if (growing) {
                    scale += 0.01
                    if (scale >= 1.3) growing = false
                } else {
                    scale -= 0.01
                    if (scale <= 1) growing = true
                }
                point.scale.set(scale, scale, scale)
                glow.scale.set(scale * 1.2, scale * 1.2, scale * 1.2)
                const id = requestAnimationFrame(pulse)
                this.animationFrameIds.push(id)
            }
        }
        pulse()
    }

    create2D() {
        document.getElementById("crt-overlay").classList.remove("active")

        const shapes = []

        const triangleShape = new window.THREE.Shape()
        triangleShape.moveTo(0, 1)
        triangleShape.lineTo(-0.866, -0.5)
        triangleShape.lineTo(0.866, -0.5)
        triangleShape.lineTo(0, 1)

        const triangleGeometry = new window.THREE.ShapeGeometry(triangleShape)
        const triangleMaterial = new window.THREE.MeshBasicMaterial({
            color: 0xff006e,
            side: window.THREE.DoubleSide,
        })
        const triangle = new window.THREE.Mesh(triangleGeometry, triangleMaterial)
        triangle.position.x = -3
        shapes.push(triangle)

        const squareGeometry = new window.THREE.PlaneGeometry(1.5, 1.5)
        const squareMaterial = new window.THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            side: window.THREE.DoubleSide,
        })
        const square = new window.THREE.Mesh(squareGeometry, squareMaterial)
        square.position.x = 0
        shapes.push(square)

        const pentagonShape = new window.THREE.Shape()
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
            const x = Math.cos(angle) * 0.8
            const y = Math.sin(angle) * 0.8
            if (i === 0) pentagonShape.moveTo(x, y)
            else pentagonShape.lineTo(x, y)
        }
        pentagonShape.lineTo(Math.cos(-Math.PI / 2) * 0.8, Math.sin(-Math.PI / 2) * 0.8)

        const pentagonGeometry = new window.THREE.ShapeGeometry(pentagonShape)
        const pentagonMaterial = new window.THREE.MeshBasicMaterial({
            color: 0x8000ff,
            side: window.THREE.DoubleSide,
        })
        const pentagon = new window.THREE.Mesh(pentagonGeometry, pentagonMaterial)
        pentagon.position.x = 3
        shapes.push(pentagon)

        shapes.forEach((shape, i) => {
            setTimeout(() => {
                shape.scale.set(0, 0, 0)
                this.scene.add(shape)
                this.objects.push(shape)

                let currentScale = 0
                const scaleUp = () => {
                    if (currentScale < 1 && this.currentDimension === 1) {
                        currentScale += 0.05
                        shape.scale.set(currentScale, currentScale, currentScale)
                        const id = requestAnimationFrame(scaleUp)
                        this.animationFrameIds.push(id)
                    }
                }
                scaleUp()
            }, i * 500)
        })

        const rotateShapes = () => {
            if (this.currentDimension === 1) {
                shapes.forEach((shape) => {
                    shape.rotation.z += 0.01
                })
                const id = requestAnimationFrame(rotateShapes)
                this.animationFrameIds.push(id)
            }
        }
        rotateShapes()
    }

    create3D() {
        if (!this.monitorTransformed) {
            this.showTransformationEffect()
            this.monitorTransformed = true
        }

        const objects = []

        const coneGeometry = new window.THREE.ConeGeometry(0.5, 1.5, 32)
        const coneMaterial = new window.THREE.MeshStandardMaterial({
            color: 0xff006e,
            metalness: 0.5,
            roughness: 0.3,
        })
        const cone = new window.THREE.Mesh(coneGeometry, coneMaterial)
        cone.position.set(-4, 0, 0)
        objects.push(cone)

        const pyramidGeometry = new window.THREE.TetrahedronGeometry(0.8)
        const pyramidMaterial = new window.THREE.MeshStandardMaterial({
            color: 0x00d4ff,
            metalness: 0.5,
            roughness: 0.3,
        })
        const pyramid = new window.THREE.Mesh(pyramidGeometry, pyramidMaterial)
        pyramid.position.set(-2, 0, 0)
        objects.push(pyramid)

        const cubeGeometry = new window.THREE.BoxGeometry(1.2, 1.2, 1.2)
        const cubeMaterial = new window.THREE.MeshStandardMaterial({
            color: 0x8000ff,
            metalness: 0.5,
            roughness: 0.3,
        })
        const cube = new window.THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(0, 0, 0)
        objects.push(cube)

        const torusGeometry = new window.THREE.TorusGeometry(0.6, 0.3, 16, 100)
        const torusMaterial = new window.THREE.MeshStandardMaterial({
            color: 0xffb000,
            metalness: 0.5,
            roughness: 0.3,
        })
        const torus = new window.THREE.Mesh(torusGeometry, torusMaterial)
        torus.position.set(2, 0, 0)
        objects.push(torus)

        const sphereGeometry = new window.THREE.SphereGeometry(0.7, 32, 32)
        const sphereMaterial = new window.THREE.MeshStandardMaterial({
            color: 0x00ff41,
            metalness: 0.5,
            roughness: 0.3,
        })
        const sphere = new window.THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(4, 0, 0)
        objects.push(sphere)

        objects.forEach((obj, i) => {
            setTimeout(() => {
                obj.scale.set(0, 0, 0)
                this.scene.add(obj)
                this.objects.push(obj)

                let currentScale = 0
                const scaleUp = () => {
                    if (currentScale < 1 && this.currentDimension === 2) {
                        currentScale += 0.05
                        obj.scale.set(currentScale, currentScale, currentScale)
                        const id = requestAnimationFrame(scaleUp)
                        this.animationFrameIds.push(id)
                    }
                }
                scaleUp()
            }, i * 300)
        })

        const rotateObjects = () => {
            if (this.currentDimension === 2) {
                objects.forEach((obj) => {
                    obj.rotation.x += 0.01
                    obj.rotation.y += 0.01
                })
                const id = requestAnimationFrame(rotateObjects)
                this.animationFrameIds.push(id)
            }
        }
        rotateObjects()
    }

    create4D() {
        document.getElementById("crt-overlay").classList.add("active")

        this.createTesseract()
        this.createInfiniteGrid()

        let angle = 0
        const smoothOrbit = () => {
            if (this.currentDimension === 3) {
                angle += 0.008
                this.camera.position.x = Math.sin(angle) * 5
                this.camera.position.z = Math.cos(angle) * 5
                this.camera.position.y = Math.sin(angle * 0.5) * 1.5
                this.camera.lookAt(0, 0, 0)
                const id = requestAnimationFrame(smoothOrbit)
                this.animationFrameIds.push(id)
            }
        }
        smoothOrbit()
    }

    createTesseract() {
        const vertices = [
            [-1, -1, -1],
            [1, -1, -1],
            [1, 1, -1],
            [-1, 1, -1],
            [-1, -1, 1],
            [1, -1, 1],
            [1, 1, 1],
            [-1, 1, 1],
            [-0.5, -0.5, -0.5],
            [0.5, -0.5, -0.5],
            [0.5, 0.5, -0.5],
            [-0.5, 0.5, -0.5],
            [-0.5, -0.5, 0.5],
            [0.5, -0.5, 0.5],
            [0.5, 0.5, 0.5],
            [-0.5, 0.5, 0.5],
        ]

        const edges = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
            [4, 5],
            [5, 6],
            [6, 7],
            [7, 4],
            [0, 4],
            [1, 5],
            [2, 6],
            [3, 7],
            [8, 9],
            [9, 10],
            [10, 11],
            [11, 8],
            [12, 13],
            [13, 14],
            [14, 15],
            [15, 12],
            [8, 12],
            [9, 13],
            [10, 14],
            [11, 15],
        ]

        const material = new window.THREE.LineBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.8,
        })

        edges.forEach((edge) => {
            const geometry = new window.THREE.BufferGeometry()
            const positions = new Float32Array([...vertices[edge[0]], ...vertices[edge[1]]])
            geometry.setAttribute("position", new window.THREE.BufferAttribute(positions, 3))
            const line = new window.THREE.Line(geometry, material)
            this.scene.add(line)
            this.objects.push(line)
        })

        let angle = 0
        const rotateTesseract = () => {
            if (this.currentDimension === 3) {
                angle += 0.0015
                this.objects.forEach((obj) => {
                    if (obj.type === "Line") {
                        obj.rotation.x = angle * 0.5
                        obj.rotation.y = angle * 0.7
                        obj.rotation.z = angle * 0.3
                    }
                })
                const id = requestAnimationFrame(rotateTesseract)
                this.animationFrameIds.push(id)
            }
        }
        rotateTesseract()
    }

    createInfiniteGrid() {
        const size = 100
        const divisions = 50
        const gridHelper = new window.THREE.GridHelper(size, divisions, 0x444444, 0x222222)
        this.scene.add(gridHelper)
        this.objects.push(gridHelper)
    }

    create5D() {
        document.getElementById("crt-overlay").classList.add("active")

        this.createPenteract()

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        if (isMobile) {
            document.getElementById("joystick-container").classList.add("active")
        }
    }

    createPenteract() {
        const vertices = []

        for (let i = 0; i < 32; i++) {
            const v = [
                (i >> 0) & 1 ? 1 : -1,
                (i >> 1) & 1 ? 1 : -1,
                (i >> 2) & 1 ? 1 : -1,
                (i >> 3) & 1 ? 1 : -1,
                (i >> 4) & 1 ? 1 : -1,
            ]
            vertices.push(v)
        }

        const project5Dto3D = (vertex, rotation1, rotation2) => {
            let x = vertex[0]
            let y = vertex[1]
            const z = vertex[2]
            let w = vertex[3]
            let v = vertex[4]

            let temp
            temp = x * Math.cos(rotation1) - w * Math.sin(rotation1)
            w = x * Math.sin(rotation1) + w * Math.cos(rotation1)
            x = temp

            temp = y * Math.cos(rotation2) - v * Math.sin(rotation2)
            v = y * Math.sin(rotation2) + v * Math.cos(rotation2)
            y = temp

            const scale = 2 / (2 + w + v)
            return [x * scale, y * scale, z * scale]
        }

        let rotation1 = 0
        let rotation2 = 0

        const colors = [0xff006e, 0x00d4ff, 0x8000ff, 0xffb000, 0x00ff41]

        const animate5D = () => {
            if (this.currentDimension !== 4) return

            rotation1 += 0.003
            rotation2 += 0.002

            this.objects.forEach((obj) => {
                if (obj.type === "Line") {
                    this.scene.remove(obj)
                }
            })
            this.objects = this.objects.filter((obj) => obj.type !== "Line")

            const drawnEdges = new Set()

            for (let i = 0; i < 32; i++) {
                for (let j = i + 1; j < 32; j++) {
                    const xor = i ^ j
                    const bitCount = (xor & 1) + ((xor >> 1) & 1) + ((xor >> 2) & 1) + ((xor >> 3) & 1) + ((xor >> 4) & 1)

                    if (bitCount === 1) {
                        const key = Math.min(i, j) + "-" + Math.max(i, j)
                        if (!drawnEdges.has(key)) {
                            drawnEdges.add(key)

                            const p1 = project5Dto3D(vertices[i], rotation1, rotation2)
                            const p2 = project5Dto3D(vertices[j], rotation1, rotation2)

                            const colorIdx = Math.floor(Math.random() * colors.length)
                            const material = new window.THREE.LineBasicMaterial({
                                color: colors[colorIdx],
                                transparent: true,
                                opacity: 0.6,
                            })

                            const geometry = new window.THREE.BufferGeometry()
                            const positions = new Float32Array([...p1, ...p2])
                            geometry.setAttribute("position", new window.THREE.BufferAttribute(positions, 3))

                            const line = new window.THREE.Line(geometry, material)
                            this.scene.add(line)
                            this.objects.push(line)
                        }
                    }
                }
            }

            const id = requestAnimationFrame(animate5D)
            this.animationFrameIds.push(id)
        }

        animate5D()
    }

    updateUI(index) {
        const dim = this.dimensions[index]

        document.getElementById("dimension-label").textContent = dim.name
        document.getElementById("dimension-desc").textContent = dim.description

        const infoPanel = document.getElementById("info-panel")
        infoPanel.querySelector("p").textContent = dim.info
        infoPanel.classList.add("visible")
        setTimeout(() => infoPanel.classList.remove("visible"), 8000)

        document.querySelectorAll(".progress-dot").forEach((dot, i) => {
            dot.classList.remove("active")
            if (i < index) dot.classList.add("completed")
            if (i === index) dot.classList.add("active")
            if (i > index) dot.classList.remove("completed")
        })
    }

    nextDimension() {
        if (this.currentDimension < 4 && !this.isAnimating) {
            this.isAnimating = true
            this.currentDimension++
                this.createDimension(this.currentDimension)
            this.audioSystem.playTransition()
            this.audioSystem.playDimensionAmbience(this.currentDimension)
            setTimeout(() => (this.isAnimating = false), 500)
        }
    }

    prevDimension() {
        if (this.currentDimension > 0 && !this.isAnimating) {
            this.isAnimating = true
            this.currentDimension--
                this.createDimension(this.currentDimension)
            this.audioSystem.playTransition()
            this.audioSystem.playDimensionAmbience(this.currentDimension)
            setTimeout(() => (this.isAnimating = false), 500)
        }
    }

    goToDimension(index) {
        if (index !== this.currentDimension && !this.isAnimating) {
            this.isAnimating = true
            this.currentDimension = index
            this.createDimension(this.currentDimension)
            this.audioSystem.playTransition()
            this.audioSystem.playDimensionAmbience(this.currentDimension)
            setTimeout(() => (this.isAnimating = false), 500)
        }
    }

    showTransformationEffect() {
        const flash = document.createElement("div")
        flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 9998;
      opacity: 0;
      pointer-events: none;
    `
        document.body.appendChild(flash)

        flash.style.transition = "opacity 5.0s"
        setTimeout(() => (flash.style.opacity = "1"), 10)
        setTimeout(() => (flash.style.opacity = "0"), 300)
        setTimeout(() => flash.remove(), 600)

        this.audioSystem.playTransition()
    }

    animate() {
        requestAnimationFrame(() => this.animate())

        this.updateCameraMovement()

        this.renderer.render(this.scene, this.camera)
    }
}

window.addEventListener("load", () => {
    const app = new DimensionalOdyssey()
})