var carTransform = []
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
    Matrix.translation(-cameraLane, -2, -cameraPosition, CameraTransform)
    
    var rollTransform = Matrix.temp[0]
    var translateTransform = Matrix.temp[1]
    var preCamera = Matrix.temp[2]
    Matrix.rotateZ(-roll, rollTransform)
    Matrix.translation(lane, 0, position, translateTransform)
    Matrix.multiply(rollTransform, translateTransform, preCamera)
    Matrix.multiply(preCamera, CameraTransform, carTransform)
    
    UpdateEntities(delta)
}