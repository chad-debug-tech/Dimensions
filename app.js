class AudioSystem {
    constructor() {
        this.audioContext = null
        this.enabled = true
        this.currentOscillators = []
        this.masterGain = null
        this.audioElement = null
        this.currentTrack = null
        this.tracks = [{
                name: "1D - Point",
                url: "/audio/1d.mp3",
                startTime: 3,
            },
            {
                name: "2D - Flatland",
                url: "/audio/2d.mp3",
                startTime: 0,
            },
            {
                name: "3D - Reality",
                url: "/audio/maintheme.mp3",
                startTime: 10,
            },
            {
                name: "4D - Tesseract",
                url: "/audio/4d.mp3",
                startTime: 7,
            },
            {
                name: "5D - Penteract",
                url: "/audio/5d.mp3",
                startTime: 5,
            },
        ]
        this.transitionUrl = "/audio/translation.mp3"
    }

    init() {
        try {
            this.audioContext = new(window.AudioContext || window.webkitAudioContext)()
            this.masterGain = this.audioContext.createGain()
            this.masterGain.connect(this.audioContext.destination)
            this.masterGain.gain.value = 0.3

            this.audioElement = document.getElementById("audio-element")
            if (this.audioElement) {
                this.audioElement.volume = 0.7
            }
        } catch (e) {
            console.error("[v0] Audio context initialization failed:", e)
        }
    }

    toggle() {
        if (!this.audioContext) return this.enabled
        this.enabled = !this.enabled
        this.masterGain.gain.value = this.enabled ? 0.3 : 0
        return this.enabled
    }

    stopAll() {
        this.currentOscillators.forEach((osc) => {
            try {
                osc.stop()
            } catch (e) {}
        })
        this.currentOscillators = []
    }

    playDimensionAmbience(dimension) {
        this.stopAll()
        if (!this.enabled) return

        const track = this.tracks[dimension]
        if (track && this.audioElement) {
            this.audioElement.src = track.url
            this.audioElement.currentTime = track.startTime
            this.audioElement.play().catch((e) => console.error("[v0] Music playback failed:", e))
        }
    }

    playTransition() {
        if (!this.enabled || !this.audioContext) return
        if (this.audioElement) {
            this.audioElement.src = this.transitionUrl
            this.audioElement.currentTime = 0
            this.audioElement.play().catch((e) => console.error("[v0] Transition audio failed:", e))
        }
    }

    playLonelySpace() {
        const osc = this.audioContext.createOscillator()
        const gain = this.audioContext.createGain()

        osc.type = "sine"
        osc.frequency.value = 110
        gain.gain.value = 0.1

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.start()
        this.currentOscillators.push(osc)
    }

    playGeometricBeeps() {
        const frequencies = [220, 277, 330, 440]
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                this.playBeep(freq, 0.3)
            }, i * 500)
        })
    }

    playBeep(frequency, duration) {
        if (!this.enabled) return

        const osc = this.audioContext.createOscillator()
        const gain = this.audioContext.createGain()

        osc.type = "square"
        osc.frequency.value = frequency
        gain.gain.value = 0.05

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.start()
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration)
        osc.stop(this.audioContext.currentTime + duration)
    }

    playMindBending() {
        const osc = this.audioContext.createOscillator()
        const gain = this.audioContext.createGain()

        osc.type = "sawtooth"
        osc.frequency.value = 55
        gain.gain.value = 0.08

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.frequency.exponentialRampToValueAtTime(110, this.audioContext.currentTime + 4)

        osc.start()
        this.currentOscillators.push(osc)
    }

    playGlitchChaos() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const randomFreq = Math.random() * 500 + 200
                this.playBeep(randomFreq, 0.1)
            }, i * 200)
        }
    }

    playError() {
        if (!this.enabled || !this.audioContext) return

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.playBeep(150, 0.2)
            }, i * 250)
        }
    }
}

class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById("particles")
        this.ctx = this.canvas.getContext("2d")
        this.particles = []
        this.resize()
        this.init()

        window.addEventListener("resize", () => this.resize())
    }

    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
            })
        }
    }

    update() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.particles.forEach((p) => {
            p.x += p.vx
            p.y += p.vy

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1

            this.ctx.fillStyle = "rgba(0, 212, 255, 0.5)"
            this.ctx.beginPath()
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            this.ctx.fill()
        })

        requestAnimationFrame(() => this.update())
    }
}

class DimensionalOdyssey {
    constructor() {
        this.currentDimension = 0
        this.scene = null
        this.camera = null
        this.renderer = null
        this.objects = []
        this.isAnimating = false
        this.audioSystem = new AudioSystem()
        this.monitorTransformed = false
        this.animationFrameIds = []
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        this.isTablet = this.isMobile && (window.innerWidth > 600 || window.innerHeight > 600)

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
            yaw: 0,
            joystickX: 0,
            joystickY: 0,
        }

        this.dimensions = [{
                name: "1ST DIMENSION",
                description: "The Lonely Point",
                info: "In the first dimension, there is only position on a single line. No width, no height - just a point that can move forward or backward.",
            },
            {
                name: "2ND DIMENSION",
                description: "Flatland Universe",
                info: "The second dimension adds width. Shapes can now be drawn: lines, triangles, squares. Imagine living on a flat piece of paper with no concept of 'up'.",
            },
            {
                name: "3RD DIMENSION",
                description: "Our Reality",
                info: "Welcome to our world! The third dimension adds depth. Objects have length, width, and height. We can walk around things and see all sides.",
            },
            {
                name: "4TH DIMENSION",
                description: "The Tesseract",
                info: "The fourth spatial dimension is beyond our perception. A tesseract (4D cube) passes through our 3D world like a 3D sphere passes through Flatland.",
            },
            {
                name: "5TH DIMENSION",
                description: "The Penteract",
                info: "A 5D cube with nested hyperdimensions. This represents the incomprehensible - geometry that exists in five spatial dimensions, visualized through projection.",
            },
        ]

        this.init()
    }

    init() {
        this.setupThreeJS()
        this.setupEventListeners()
        this.createDimension(0)

        const particles = new ParticleBackground()
        particles.update()

        setTimeout(() => {
            document.getElementById("loading-screen").classList.add("hidden")
        }, 3000)

        this.setupCameraControls()
        this.detectMobileDevice()
    }

    setupThreeJS() {
        const container = document.getElementById("canvas-container")
        this.scene = new window.THREE.Scene()
        this.scene.background = new window.THREE.Color(0x0a0a0f)

        this.camera = new window.THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000)
        this.camera.position.z = 3

        this.renderer = new window.THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        })

        const pixelRatio = this.isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(pixelRatio)
        container.appendChild(this.renderer.domElement)

        const light = new window.THREE.DirectionalLight(0xffffff, 0.8)
        light.position.set(5, 5, 5)
        this.scene.add(light)

        const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.4)
        this.scene.add(ambientLight)

        window.addEventListener("resize", () => this.onWindowResize())

        this.animate()
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        this.isTablet = this.isMobile && (window.innerWidth > 600 || window.innerHeight > 600)
    }

    clearScene() {
        this.objects.forEach((obj) => {
            if (obj.geometry) obj.geometry.dispose()
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach((m) => m.dispose())
                } else {
                    obj.material.dispose()
                }
            }
            this.scene.remove(obj)
        })
        this.objects = []

        this.animationFrameIds.forEach((id) => cancelAnimationFrame(id))
        this.animationFrameIds = []

        const hint = document.querySelector(".control-hint")
        if (hint) hint.remove()
        document.getElementById("joystick-container").classList.remove("active")
    }

    setupCameraControls() {
        document.addEventListener("keydown", (e) => {
            if (this.currentDimension === 4) {
                const key = e.key.toLowerCase()
                if (key === "w") this.cameraControls.forward = true
                if (key === "s") this.cameraControls.backward = true
                if (key === "a") this.cameraControls.left = true
                if (key === "d") this.cameraControls.right = true
                if (key === " ") this.cameraControls.up = true
                if (key === "control") this.cameraControls.down = true
            }
        })

        document.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase()
            if (key === "w") this.cameraControls.forward = false
            if (key === "s") this.cameraControls.backward = false
            if (key === "a") this.cameraControls.left = false
            if (key === "d") this.cameraControls.right = false
            if (key === " ") this.cameraControls.up = false
            if (key === "control") this.cameraControls.down = false
        })

        document.addEventListener("mousemove", (e) => {
            if (this.currentDimension === 4 && !this.isMobile) {
                const deltaX = e.clientX - this.cameraControls.lastMouseX
                const deltaY = e.clientY - this.cameraControls.lastMouseY

                this.cameraControls.yaw -= deltaX * 0.01
                this.cameraControls.pitch -= deltaY * 0.01

                this.cameraControls.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.cameraControls.pitch))
            }

            this.cameraControls.lastMouseX = e.clientX
            this.cameraControls.lastMouseY = e.clientY
        })

        let touchStartX = 0
        let touchStartY = 0

        document.addEventListener(
            "touchstart",
            (e) => {
                touchStartX = e.touches[0].clientX
                touchStartY = e.touches[0].clientY
            }, { passive: true },
        )

        document.addEventListener(
            "touchmove",
            (e) => {
                if (this.currentDimension === 4 && this.isMobile) {
                    const touchX = e.touches[0].clientX
                    const touchY = e.touches[0].clientY
                    const deltaX = touchX - touchStartX
                    const deltaY = touchY - touchStartY

                    this.cameraControls.yaw -= deltaX * 0.005
                    this.cameraControls.pitch -= deltaY * 0.005

                    this.cameraControls.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.cameraControls.pitch))
                }
            }, { passive: true },
        )

        this.setupJoystickControls()
    }

    setupJoystickControls() {
        const joystickContainer = document.getElementById("joystick-container")
        const joystickInner = joystickContainer.querySelector(".joystick-inner")

        let isJoystickActive = false
        const baseRadius = joystickContainer.offsetWidth / 2
        const innerRadius = baseRadius / 2.4

        joystickContainer.addEventListener("touchstart", (e) => {
            isJoystickActive = true
            e.preventDefault()
        })

        joystickContainer.addEventListener("touchmove", (e) => {
            if (!isJoystickActive) return

            const touch = e.touches[0]
            const rect = joystickContainer.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            let deltaX = touch.clientX - centerX
            let deltaY = touch.clientY - centerY

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            const maxDistance = baseRadius - innerRadius

            if (distance > maxDistance) {
                const angle = Math.atan2(deltaY, deltaX)
                deltaX = Math.cos(angle) * maxDistance
                deltaY = Math.sin(angle) * maxDistance
            }

            joystickInner.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`

            this.cameraControls.joystickX = deltaX / maxDistance
            this.cameraControls.joystickY = -deltaY / maxDistance
        })

        joystickContainer.addEventListener("touchend", () => {
            isJoystickActive = false
            joystickInner.style.transform = "translate(-50%, -50%)"
            this.cameraControls.joystickX = 0
            this.cameraControls.joystickY = 0
        })
    }

    detectMobileDevice() {
        if (this.isMobile) {
            const hint = document.querySelector(".control-hint")
            if (hint) {
                if (this.isTablet) {
                    hint.textContent = "Use arrow keys or swipe to navigate"
                } else {
                    hint.textContent = "Use joystick or swipe to move"
                }
            }
        }
    }

    updateCameraMovement() {
        if (this.currentDimension !== 4) return

        const speed = 0.2
        const direction = new window.THREE.Vector3()

        const forward = new window.THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion)
        const right = new window.THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion)

        if (this.cameraControls.forward || this.cameraControls.joystickY > 0.2) {
            direction.addScaledVector(forward, speed)
        }
        if (this.cameraControls.backward || this.cameraControls.joystickY < -0.2) {
            direction.addScaledVector(forward, -speed)
        }
        if (this.cameraControls.left || this.cameraControls.joystickX < -0.2) {
            direction.addScaledVector(right, -speed)
        }
        if (this.cameraControls.right || this.cameraControls.joystickX > 0.2) {
            direction.addScaledVector(right, speed)
        }
        if (this.cameraControls.up) {
            direction.y += speed
        }
        if (this.cameraControls.down) {
            direction.y -= speed
        }

        this.camera.position.add(direction)

        const euler = new window.THREE.Euler(this.cameraControls.pitch, this.cameraControls.yaw, 0, "YXZ")
        this.camera.quaternion.setFromEuler(euler)
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

        if (this.isMobile) {
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

class SweepSystem {
    constructor() {
        this.currentSweep = 0
        this.sweepPhases = [
            { name: "Color Shift", duration: 3000 },
            { name: "Shape Morph", duration: 2500 },
            { name: "Effect Wave", duration: 2000 },
            { name: "Glow Pulse", duration: 1500 },
        ]
        this.sweepIndex = 0
        this.colorPalettes = [
            { primary: 0xff006e, secondary: 0x00d4ff, accent: 0x8000ff },
            { primary: 0xffb000, secondary: 0xff006e, accent: 0x00ff41 },
            { primary: 0x00d4ff, secondary: 0x8000ff, accent: 0xff006e },
            { primary: 0x00ff41, secondary: 0xffb000, accent: 0x00d4ff },
        ]
        this.activePalette = 0
    }

    start() {
        this.sweepLoop()
    }

    sweepLoop() {
        const phase = this.sweepPhases[this.sweepIndex % this.sweepPhases.length]
        this.currentSweep = this.sweepIndex
        this.sweepIndex++

            setTimeout(() => {
                this.sweepLoop()
            }, phase.duration)
    }

    getPaletteColor(index) {
        const palette = this.colorPalettes[this.activePalette]
        const keys = Object.keys(palette)
        return palette[keys[index % keys.length]]
    }

    rotatePalette() {
        this.activePalette = (this.activePalette + 1) % this.colorPalettes.length
    }

    getSweepPhase() {
        return this.sweepPhases[this.currentSweep % this.sweepPhases.length].name
    }
}