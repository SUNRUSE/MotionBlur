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
var cameraLane = 0

function Update(delta) {   
    var targetRoll = ((Controls.turningRight ? 1 : 0) - (Controls.turningLeft ? 1 : 0)) * 0.5
    roll = Ease(roll, targetRoll, 3, delta)
    if(Controls.accelerating) speed += 40 * delta
    speed = Dampen(speed, 0.2, delta)
    position += speed * delta
    lane += roll * speed * delta * 0.6
    cameraPosition = Ease(cameraPosition, position - 4, 50, delta)
    cameraLane = Ease(cameraLane, lane, 50, delta)
    
    carTransform[3] *= -1
    carTransform[0] = Math.cos(roll)
    carTransform[1] = Math.sin(roll)
    carTransform[4] = -Math.sin(roll)
    carTransform[5] = Math.cos(roll)
    carTransform[3] = lane - cameraLane
    carTransform[11] = position - cameraPosition
    
    trackTransform[3] = -cameraLane
    trackTransform[11] = -cameraPosition
    
    UpdateEntities(delta)
}