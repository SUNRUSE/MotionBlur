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
    
    setInterval(Update, 10)
    window.requestAnimationFrame(Draw)
}

function ResetCamera() {
    newLocation = 0
    
    // Prevent page refresh.
    event.preventDefault()
}