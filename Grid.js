//definition of Grid
//stores all parameters and functions related to the grid
function Grid(rows, cols) {
    this.gridArray = [];
    this.rows = Number(rows);
    this.cols = Number(cols);
    this.startingLocation;
    this.currentLocation;
    this.direction;

    this.render = function () {
        var gridElement = document.getElementById("grid");
        for (let i = 0; i < this.rows; i++) {
            const rowDiv = document.createElement("div");
            rowDiv.className = "grid_row";
            gridElement.append(rowDiv);
            this.gridArray[i] = [];
            for (let j = 0; j < this.cols; j++) {
                const cellDiv = document.createElement("div");
                cellDiv.className = "cell";
                rowDiv.appendChild(cellDiv);
                const cell = new Cell(cellDiv, i, j);
                this.gridArray[i].push(cell);

            }

        }
        console.log(this.gridArray);
        
    }
}