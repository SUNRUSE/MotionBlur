var trackInstance = new CloudInstance(Meshes.track)

function Draw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    GL.viewport(0, 0, window.innerWidth, window.innerHeight)
    
    GL.clear(GL.COLOR_BUFFER_BIT)
    
    trackInstance.draw(program, CameraTransform, 1, 1, 1, 1)
    
    carInstance.draw(program, carTransform, 1, 1, 1, 1)
    
    DrawEntities(program)
}