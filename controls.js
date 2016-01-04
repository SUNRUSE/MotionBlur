var Controls = {
    turningLeft: false,
    turningRight: false,
    accelerating: false,
    braking: false
}

var KeyMappings = {
    "65": "turningLeft",
    "68": "turningRight",
    "87": "accelerating",
    "83": "braking"
}

function OnKeyUp() {
    var mapping = KeyMappings[event.keyCode]
    if(!mapping) return
    KeyMappings[mapping] = false
}

function OnKeyDown() {
    var mapping = KeyMappings[event.keyCode]
    if(!mapping) return
    KeyMappings[mapping] = true
}