function Entity(cloud) {
    this.transform = []
    this.transformTemp = []
    this.cloudInstance = new CloudInstance(cloud)
    
    Entities.push(this)
}

var CameraTransform = []

Entity.prototype.update = function(delta) {}

var Entities = []

function UpdateEntities(delta) {
    for(var i = 0; i < Entities.length; i++) {
        var entity = Entities[i]
        entity.update(delta)
    }
}
function DrawEntities(program) {
    for(var i = 0; i < Entities.length; i++) {
        var entity = Entities[i]
        Matrix.multiply(entity.transform, CameraTransform, entity.transformTemp)
    }
    
    Entities.sort(function(a, b) {
        return a.transformTemp[11] - b.transformTemp[11]
    })
    
    for(var i = 0; i < Entities.length; i++) {
        var entity = Entities[i]
        entity.cloudInstance.draw(program, entity.transformTemp, 1, 1, 1, 1)
    }
}