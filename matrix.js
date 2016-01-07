var Matrix = {
    temp: [[],[],[],[]],
    multiply: function(a, b, output) {
        for(var row = 0; row < 4; row++) {
            for(var column = 0; column < 4; column++) {
                var temp = 0
                for(var component = 0; component < 4; component++) {
                    temp += a[component * 4 + column] * b[row * 4 + component]
                }
                output[row * 4 + column] = temp 
            }
        }
    },
    identity: function(output) {
        for(var row = 0; row < 4; row++) {
            for(var column = 0; column < 4; column++) {
                output[row * 4 + column] = row == column ? 1 : 0
            }
        }
    },
    translation: function(x, y, z, output) {
        output[0] = 1
        output[1] = 0
        output[2] = 0
        output[3] = x
        
        output[4] = 0
        output[5] = 1
        output[6] = 0
        output[7] = y
        
        output[8] = 0
        output[9] = 0
        output[10] = 1
        output[11] = z
        
        output[12] = 0
        output[13] = 0
        output[14] = 0
        output[15] = 1
    },
    rotateX: function(radians, output) {
        var sin = Math.sin(radians)
        var cos = Math.cos(radians)
        
        output[0] = 1
        output[1] = 0
        output[2] = 0
        output[3] = 0
        
        output[4] = 0
        output[5] = cos
        output[6] = -sin
        output[7] = 0
        
        output[8] = 0
        output[9] = sin
        output[10] = cos
        output[11] = 0
        
        output[12] = 0
        output[13] = 0
        output[14] = 0
        output[15] = 1
    },
    rotateY: function(radians, output) {
        var sin = Math.sin(radians)
        var cos = Math.cos(radians)
        
        output[0] = cos
        output[1] = 0
        output[2] = -sin
        output[3] = 0
        
        output[4] = 0
        output[5] = 1
        output[6] = 0
        output[7] = 0
        
        output[8] = sin
        output[9] = 0
        output[10] = cos
        output[11] = 0
        
        output[12] = 0
        output[13] = 0
        output[14] = 0
        output[15] = 1
    },
    rotateZ: function(radians, output) {
        var sin = Math.sin(radians)
        var cos = Math.cos(radians)
        
        output[0] = cos
        output[1] = -sin
        output[2] = 0
        output[3] = 0
        
        output[4] = sin
        output[5] = cos
        output[6] = 0
        output[7] = 0
        
        output[8] = 0
        output[9] = 0
        output[10] = 1
        output[11] = 0
        
        output[12] = 0
        output[13] = 0
        output[14] = 0
        output[15] = 1
    }
}