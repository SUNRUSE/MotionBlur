function Ease(current, target, rate, delta) {
    return target + ((current - target) / (1 + rate * delta))
}

function Dampen(current, rate, delta) {
    return Ease(current, 0, rate, delta)
}