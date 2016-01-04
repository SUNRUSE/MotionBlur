var GL, canvas, program, track

function OnLoad() {
    canvas = document.getElementsByTagName("canvas")[0]
    
    GL = canvas.getContext("experimental-webgl")
    
    if(!GL) {
        alert("Failed to open a WebGL context.  Please ensure that your browser is up to date and that WebGL is enabled.")
        throw new Error("Failed to get WebGL context")
    }
    
    program = CreateProgram(CreateShader(GL.VERTEX_SHADER, Shaders.vertex), CreateShader(GL.FRAGMENT_SHADER, Shaders.fragment))
    
    GL.clearColor(0, 0, 0, 1)
    GL.blendFunc(GL.ONE, GL.ONE_MINUS_SRC_ALPHA)
    GL.enable(GL.BLEND)
    
    window.requestAnimationFrame(Update)
}

var lastTimestamp = null
var newLocation = 0
var oldLocation = 0

function Update(timestamp) {
    var delta = 0
    if(lastTimestamp !== null) delta = (timestamp - lastTimestamp) / 1000
    oldLocation = newLocation
    newLocation -= delta * SpeedSlider.value
    
    Draw()
    
    lastTimestamp = timestamp
    window.requestAnimationFrame(Update)
}

var newTransform = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]

var oldTransform = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]

var carTransform = [
    1, 0, 0, 0.001,
    0, 1, 0, -2,
    0, 0, 1, 4,
    0, 0, 0, 1
]

var carTransform2 = [
    1, 0, 0, 0,
    0, 1, 0, -2,
    0, 0, 1, 4,
    0, 0, 0, 1
]

function Draw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    GL.viewport(0, 0, window.innerWidth, window.innerHeight)
    
    GL.clear(GL.COLOR_BUFFER_BIT)
    oldTransform[11] = oldLocation
    newTransform[11] = newLocation
    Meshes.track.draw(program, oldTransform, newTransform, 1, 1, 1)

    var oldTilt = Math.sin(oldLocation * 0.1)
    var newTilt = Math.sin(newLocation * 0.1)
    carTransform[0] = Math.cos(oldTilt)
    carTransform[2] = Math.sin(oldTilt)
    
    carTransform[8] = -Math.sin(oldTilt)
    carTransform[10] = Math.cos(oldTilt)
    
    carTransform2[0] = Math.cos(newTilt)
    carTransform2[2] = Math.sin(newTilt)
    
    carTransform2[8] = -Math.sin(newTilt)
    carTransform2[10] = Math.cos(newTilt)
    
    Meshes.car.draw(program, carTransform, carTransform2, 1, 1, 1)
}

function ResetCamera() {
    newLocation = 0
    
    // Prevent page refresh.
    event.preventDefault()
}