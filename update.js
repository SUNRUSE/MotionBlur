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

var roll = 0
var position = 0
var speed = 0
var lane = 0
var cameraPosition = 0

function Update() {   
    var targetRoll = ((Controls.turningRight ? 1 : 0) - (Controls.turningLeft ? 1 : 0)) * 0.5
    roll += (targetRoll - roll) * 0.05
    if(Controls.accelerating) speed += 0.03
    speed *= 0.99
    position += speed
    lane += roll * speed
    cameraPosition += (position - cameraPosition) * 0.95
    
    carTransform[3] *= -1
    carTransform[0] = Math.cos(roll)
    carTransform[1] = Math.sin(roll)
    carTransform[4] = -Math.sin(roll)
    carTransform[5] = Math.cos(roll)
    
    trackTransform[3] = -lane
    trackTransform[11] = -position
    
    UpdatedSinceLastDraw = true
}