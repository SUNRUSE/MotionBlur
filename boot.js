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
    
    window.requestAnimationFrame(NewFrame)
}

var lastTimestamp = null
function NewFrame(timestamp) {
    var delta
    if(lastTimestamp === null) {
        delta = 0
    } else {
        // Below 10FPS, either the game was suspended for a long time, or is running very slowly.
        // Cap the delta there to keep the game stable. 
        delta = Math.min(0.1, (timestamp - lastTimestamp) / 1000)
    }
    lastTimestamp = timestamp
    
    Update(delta)
    Draw()
    
    window.requestAnimationFrame(NewFrame)
}

function ResetCamera() {
    newLocation = 0
    
    // Prevent page refresh.
    event.preventDefault()
}