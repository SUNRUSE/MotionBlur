var newLocation = 0

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

function Update() {
    newLocation -= (SpeedSlider.value) / 60
    
    trackTransform[11] = newLocation    
    
    var tilt = Math.sin(newLocation * 0.1)

    carTransform[0] = Math.cos(tilt)
    carTransform[2] = Math.sin(tilt)
    
    carTransform[8] = -Math.sin(tilt)
    carTransform[10] = Math.cos(tilt)    
    
    UpdatedSinceLastDraw = true
}