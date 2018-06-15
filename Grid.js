//definition of Grid
//stores all parameters and functions related to the grid
function Grid(rows, cols) {
    this.gridArray = [];
    this.rows = Number(rows);
    this.cols = Number(cols);
    this.startingLocation = {};
    this.currentLocation = {};
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

    this.placeRover = function (x_coord, y_coord, direction) {
        //set starting and current location of rover
        this.startingLocation.x = Number(x_coord);
        this.startingLocation.y = Number(y_coord);
        this.direction = direction;
        // turn background color of that cell to red
        this.gridArray[x_coord][y_coord].htmlNode.style.backgroundColor = 'red';
        //based on direction input by user, place HtML code of respective direction into the cell
        switch (direction.toUpperCase()) {
            case 'N':
                this.gridArray[x_coord][y_coord].htmlNode.innerHTML  = "<h3 id='rover_character'>&#8593;</h3>"                
                break;
            case 'S':
                this.gridArray[x_coord][y_coord].htmlNode.innerHTML  = "<h3 id='rover_character'>&#8595;</h3>"            
                break;
            case 'E':
                this.gridArray[x_coord][y_coord].htmlNode.innerHTML  = "<h3 id='rover_character'>&#8594;</h3>"            
                break;
            case 'W':
                this.gridArray[x_coord][y_coord].htmlNode.innerHTML  = "<h3 id='rover_character'>&#8592;</h3>"            
                break;
    
            default:
                console.log("invalid direction");
        }

    }

}