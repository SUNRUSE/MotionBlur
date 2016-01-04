function CloudInstance(cloud) {
    this.cloud = cloud
}

CloudInstance.prototype.draw = function(program, transform, red, green, blue, alpha) {
    this.cloud.draw(program, (this.oldTransform ? this.oldTransform : transform), transform, red, green, blue, alpha)
    if(!this.oldTransform) this.oldTransform = []
    for(var i = 0; i < 16; i++) {
        this.oldTransform[i] = transform[i]
    }
}