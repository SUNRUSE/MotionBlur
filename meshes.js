var Meshes = {}

Meshes.track = new Cloud()
for(var i = 0; i < 128; i++) {
    Meshes.track.add(0, -2, i * 8, 0.6, 2, 1.2, 0.2, 0, 3)
    Meshes.track.addMirror(6, -2, i * 8, 0.6, 2, 1.2, 0.2, 0, 3)
    Meshes.track.addMirror(12, -2, i * 8, 0.6, 2, 1.2, 0.2, 0, 3)
    
    Meshes.track.add(0, -2, i * 8 + 2, 0.2, 2, 0.5, 0.2, 0, 3)
    Meshes.track.addMirror(6, -2, i * 8 + 2, 0.2, 2, 0.5, 0.2, 0, 3)
    Meshes.track.addMirror(12, -2, i * 8 + 2, 0.2, 2, 0.5, 0.2, 0, 3)
    
    Meshes.track.addMirror(14, Math.abs(Math.sin(i * Math.PI / 8)) * -20 + 20, i * 8, 3, 0.2, 1, 1.5, 0, 5)
}

for(var i = 0; i < 16; i++) {
    Meshes.track.addMirror(3, 20, i * 64, 1, 0, 1, 0, 0, 3)
    Meshes.track.addMirror(8, 20, i * 64, 1, 0, 1, 0, 0, 3)
    Meshes.track.addMirror(14, 12, i * 64, 1, 0, 1, 0, 0, 3)
    Meshes.track.addMirror(14, 6, i * 64, 1, 0, 1, 0, 0, 3)
    Meshes.track.addMirror(14, 0, i * 64, 1, 0, 1, 0, 0, 3)
}