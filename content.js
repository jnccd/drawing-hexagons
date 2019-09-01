const draw = SVG(document.body)

// paramters
const gridRadius = 3
const hexSize = 30;
const drawCudeCoords = true

// rendering
function renderHex(hex) {
    hex.render(draw)
}
const Hex = Honeycomb.extendHex({
    size: hexSize,

    render(draw) {
        const position = this.toPoint()
        const centerPosition = this.center().add(position)

        this.draw = draw

        // draw the hex
        this.draw
            .polygon(this.corners().map(({ x, y }) => `${x},${y}`))
            .fill('none')
            .stroke({ width: 1, color: '#999' })
            .translate(position.x, position.y)

        const fontSize = 12

        // draw coordinates
        if (drawCudeCoords)
        {
            const coords = Hex(this.x - gridRadius, this.y - gridRadius).cube();
            // bottom
            this.draw
                .text(`${coords.r}`)
                .font({
                size: fontSize,
                anchor: 'middle',
                leading: 1.4,
                fill: '#69c'
            })
            .translate(centerPosition.x, centerPosition.y - fontSize + hexSize / 2)
            // right
            this.draw
                .text(`${coords.s}`)
                .font({
                size: fontSize,
                anchor: 'middle',
                leading: 1.4,
                fill: '#69c'
            })
            .translate(centerPosition.x + hexSize / 2.5, centerPosition.y - fontSize - hexSize / 2.5)
            // left
            this.draw
                .text(`${coords.q}`)
                .font({
                size: fontSize,
                anchor: 'middle',
                leading: 1.4,
                fill: '#69c'
            })
            .translate(centerPosition.x - hexSize / 2.5, centerPosition.y - fontSize - hexSize / 2.5)
        }
        else
        {
            this.draw
                .text(`${this.x - gridRadius},${this.y - gridRadius}`)
                .font({
                size: fontSize,
                anchor: 'middle',
                leading: 1.4,
                fill: '#69c'
            })
            .translate(centerPosition.x, centerPosition.y - fontSize)
        }
    },
    highlight(x, y) {
        const position = this.toPoint()
        this.draw
            .polygon(this.corners().map(({ x, y }) => `${x},${y}`))
            .fill('none')
            .stroke({ width: 1, color: '#000' })
            .translate(position.x, position.y)
    }
})
const Grid = Honeycomb.defineGrid(Hex)
const grid = Grid.hexagon({
    radius: gridRadius,
    center: [gridRadius, gridRadius],
    onCreate: renderHex
})

document.addEventListener('click', ({ offsetX, offsetY }) => {
    const hexCoordinates = Grid.pointToHex([offsetX, offsetY])
    const hex = grid.get(hexCoordinates)
    
    if (hex) {
        hex.highlight(offsetX, offsetY)
    }
})