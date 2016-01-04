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

function Update(timestamp) {
    var delta = 0
    if(lastTimestamp !== null) delta = (timestamp - lastTimestamp) / 1000
    newLocation -= delta * SpeedSlider.value
    
    Draw()
    
    lastTimestamp = timestamp
    window.requestAnimationFrame(Update)
}

var trackTransform = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]
var trackInstance = new CloudInstance(Meshes.track)

var carTransform = [
    1, 0, 0, 0.001,
    0, 1, 0, -2,
    0, 0, 1, 4,
    0, 0, 0, 1
]
var carInstance = new CloudInstance(Meshes.car)

function Draw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    GL.viewport(0, 0, window.innerWidth, window.innerHeight)
    
    GL.clear(GL.COLOR_BUFFER_BIT)
    trackTransform[11] = newLocation
    trackInstance.draw(program, trackTransform, 1, 1, 1, 1)

    var tilt = Math.sin(newLocation * 0.1)

    carTransform[0] = Math.cos(tilt)
    carTransform[2] = Math.sin(tilt)
    
    carTransform[8] = -Math.sin(tilt)
    carTransform[10] = Math.cos(tilt)
    
    carInstance.draw(program, carTransform, 1, 1, 1, 1)
}

function ResetCamera() {
    newLocation = 0
    
    // Prevent page refresh.
    event.preventDefault()
}