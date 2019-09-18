const draw = SVG(document.body)

// paramters
const gridRadius = 4
const hexSize = 30
const fontSize = 12

// other
var mouseCoords = [-1, -1]
var mouseHexCoords
var mouseHexCubeCoords
var hexSizeToHexWidthMultiplier = 1.732050807568877;
var samy

// rendering
function renderHex(hex) {
    hex.render(draw)
}
const Hex = Honeycomb.extendHex({
    size: hexSize,

    render(draw) {
        const position = this.toPoint()
        const centerPosition = this.center().add(position)
        const cubeCoords = Hex(this.x - gridRadius, this.y - gridRadius).cube()

        this.draw = draw
        
        var width = 1
        var color = '#999'
        var leftFontWeight = 'normal'
        var rigthFontWeight = 'normal'
        var bottomFontWeight = 'normal'
        var leftFontFill = '#69c'
        var rigthFontFill = '#69c'
        var bottomFontFill = '#69c'

        if (mouseHexCubeCoords !== undefined) {
                if (cubeCoords.s == mouseHexCubeCoords.s) {
                    width = 3
                    color = '#E22'
                    bottomFontWeight = 'bolder'
                    bottomFontFill = color
                }
                if (cubeCoords.r == mouseHexCubeCoords.r) {
                    width = 3
                    color = '#2E2'
                    rigthFontWeight = 'bolder'
                    rightFontFill = '#0F0'
                }
                if (cubeCoords.q == mouseHexCubeCoords.q) {
                    width = 3
                    color = '#22E'
                    leftFontWeight = 'bolder'
                    leftFontFill = color
                }
                if (cubeCoords.s == mouseHexCubeCoords.s &
                    cubeCoords.r == mouseHexCubeCoords.r &
                    cubeCoords.q == mouseHexCubeCoords.q) {
                    width = 3
                    color = '#777'
                }
        }

        // draw the hex
        this.draw
            .polygon(this.corners().map(({ x, y }) => `${x},${y}`))
            .fill('none')
            .stroke({ width: width, color: color })
            .translate(position.x, position.y)

        // draw coordinates
        // bottom
        this.draw
            .text(`${cubeCoords.s}`)
            .font({
            size: fontSize,
            anchor: 'middle',
            leading: 1.4,
            fill: bottomFontFill,
            weight: bottomFontWeight
        })
        .translate(centerPosition.x, centerPosition.y - fontSize + hexSize / 2)
        // right
        this.draw
            .text(`${cubeCoords.r}`)
            .font({
            size: fontSize,
            anchor: 'middle',
            leading: 1.4,
            fill: rigthFontFill,
            weight: rigthFontWeight
        })
        .translate(centerPosition.x + hexSize / 2.5, centerPosition.y - fontSize - hexSize / 2.5)
        // left
        this.draw
            .text(`${cubeCoords.q}`)
            .font({
            size: fontSize,
            anchor: 'middle',
            leading: 1.4,
            fill: leftFontFill,
            weight: leftFontWeight
        })
        .translate(centerPosition.x - hexSize / 2.5, centerPosition.y - fontSize - hexSize / 2.5)
    }
})
const Grid = Honeycomb.defineGrid(Hex)
var grid = Grid.hexagon({
    radius: gridRadius,
    center: [gridRadius, gridRadius],
    onCreate: renderHex
})

document.addEventListener('mousemove', ({ x, y }) => {
    mouseCoords = [x, y]
    mouseHexCoords = grid.get(Grid.pointToHex([x, y]))
    if (mouseHexCoords !== undefined)
        mouseHexCubeCoords = Hex(mouseHexCoords.x - gridRadius, 
            mouseHexCoords.y - gridRadius).cube()
    
    draw.clear()
    grid = Grid.hexagon({
        radius: gridRadius,
        center: [gridRadius, gridRadius],
        onCreate: renderHex
    })
})