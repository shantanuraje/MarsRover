//definition of Grid
//stores all parameters and functions related to the grid
const northRover = "<h3 id='rover_character'>&#8593;</h3>"
const southRover = "<h3 id='rover_character'>&#8595;</h3>"
const eastRover = "<h3 id='rover_character'>&#8594;</h3>"
const westRover = "<h3 id='rover_character'>&#8592;</h3>"
function Grid(rows, cols) {
    this.gridArray = [];
    this.rows = Number(rows);
    this.cols = Number(cols);
    this.startingLocation = {};
    this.currentLocation = {};
    this.direction;
    this.obstacleEncountered = false;

    this.render = function (xCoord, yCoord) {
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

                // generate random x,y coordinate as obstacle
                obstacleCoordinates = { 'x': Math.round(Math.random() * this.rows), 'y': Math.round(Math.random() * this.cols) }
                // if either i or j is equal to generated x and y make that cell an obstacle
                if ((i == obstacleCoordinates.x || j == obstacleCoordinates.y) && (i != xCoord && j != yCoord)) {
                    // console.log(obstacleCoordinates.x, obstacleCoordinates.y);
                    cell.obstacle = true;
                    cellDiv.style.backgroundColor = 'black';
                }

                this.gridArray[i].push(cell);

            }

        }
        console.log(this.gridArray);

    }

    this.placeRover = function (x_coord, y_coord, direction) {
        //set starting and current location of rover
        this.startingLocation.x = Number(x_coord);
        this.startingLocation.y = Number(y_coord);
        this.currentLocation = this.startingLocation;
        this.direction = direction;
        // turn background color of that cell to red
        this.gridArray[x_coord][y_coord].htmlNode.style.backgroundColor = 'red';
        //based on direction input by user, place HtML code of respective direction into the cell
        switch (direction.toUpperCase()) {
            case 'N':
                this.gridArray[x_coord][y_coord].htmlNode.innerHTML = "<h3 id='rover_character'>&#8593;</h3>"
                break;
            case 'S':
                this.gridArray[x_coord][y_coord].htmlNode.innerHTML = "<h3 id='rover_character'>&#8595;</h3>"
                break;
            case 'E':
                this.gridArray[x_coord][y_coord].htmlNode.innerHTML = "<h3 id='rover_character'>&#8594;</h3>"
                break;
            case 'W':
                this.gridArray[x_coord][y_coord].htmlNode.innerHTML = "<h3 id='rover_character'>&#8592;</h3>"
                break;

            default:
                console.log("Invalid Direction");
        }

    }

    this.isObstacle = function (x_coord, y_coord) {
        if (this.gridArray[x_coord][y_coord].obstacle) {
            return true;
        } else {
            return false;
        }
    }

    this.move = function (newLocation) {
        this.gridArray[this.currentLocation.x][this.currentLocation.y].htmlNode.style.backgroundColor = 'white';
        this.gridArray[this.currentLocation.x][this.currentLocation.y].htmlNode.removeChild(document.getElementById('rover_character'));
        this.gridArray[newLocation.x][newLocation.y].htmlNode.style.backgroundColor = 'red'
        this.currentLocation = newLocation

        switch (this.direction.toUpperCase()) {
            case 'N':
                this.gridArray[newLocation.x][newLocation.y].htmlNode.innerHTML = northRover
                break;
            case 'S':
                this.gridArray[newLocation.x][newLocation.y].htmlNode.innerHTML = southRover
                break;
            case 'E':
                this.gridArray[newLocation.x][newLocation.y].htmlNode.innerHTML = eastRover
                break;
            case 'W':
                this.gridArray[newLocation.x][newLocation.y].htmlNode.innerHTML = westRover
                break;

            default:
                break;
        }
    }

    this.moveForward = function () {
        // console.log(this.direction);
        const newLocation = { 'x': this.currentLocation.x, 'y': this.currentLocation.y };

        switch (this.direction.toUpperCase()) {
            case 'N':
                if (this.currentLocation.x > 0) {
                    newLocation.x = this.currentLocation.x - 1
                } else {
                    newLocation.x = this.rows - 1
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'S':
                if (this.currentLocation.x < this.rows - 1) {
                    newLocation.x = this.currentLocation.x + 1
                } else {
                    newLocation.x = 0
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'E':
                if (this.currentLocation.y < this.cols - 1) {
                    newLocation.y = this.currentLocation.y + 1
                } else {
                    newLocation.y = 0
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'W':
                if (this.currentLocation.y > 0) {
                    newLocation.y = this.currentLocation.y - 1
                } else {
                    newLocation.y = this.cols - 1
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;
            default:
                console.log("Invalid Direction");

                break;
        }
    }

    this.moveBackward = function () {
        // console.log(this.direction);
        const newLocation = { 'x': this.currentLocation.x, 'y': this.currentLocation.y };

        switch (this.direction.toUpperCase()) {
            case 'N':
                if (this.currentLocation.x < this.rows - 1) {
                    newLocation.x = this.currentLocation.x + 1
                } else {
                    newLocation.x = 0
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'S':
                if (this.currentLocation.x > 0) {
                    newLocation.x = this.currentLocation.x - 1
                } else {
                    newLocation.x = this.rows - 1
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'E':
                if (this.currentLocation.y > 0) {
                    newLocation.y = this.currentLocation.y - 1
                } else {
                    newLocation.y = this.cols - 1
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'W':
                if (this.currentLocation.y < this.cols - 1) {
                    newLocation.y = this.currentLocation.y + 1
                } else {
                    newLocation.y = 0
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;
            default:
                console.log("Invalid Direction");

                break;
        }
    }

    this.moveLeft = function () {
        // console.log(this.direction);
        const newLocation = { 'x': this.currentLocation.x, 'y': this.currentLocation.y };

        switch (this.direction.toUpperCase()) {
            case 'N':
                if (this.currentLocation.y > 0 ) {
                    newLocation.y = this.currentLocation.y - 1
                } else {
                    newLocation.y = this.cols - 1;
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'S':
                if (this.currentLocation.y < this.cols - 1) {
                    newLocation.y = this.currentLocation.y + 1
                } else {
                    newLocation.y = 0
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'E':
                if (this.currentLocation.x > 0) {
                    newLocation.x = this.currentLocation.x - 1
                } else {
                    newLocation.x = this.cols - 1
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'W':
                if (this.currentLocation.x < this.rows - 1) {
                    newLocation.x = this.currentLocation.x + 1
                } else {
                    newLocation.x = 0
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;
            default:
                console.log("Invalid Direction");

                break;
        }
    }

    this.moveRight = function () {
        // console.log(this.direction);
        const newLocation = { 'x': this.currentLocation.x, 'y': this.currentLocation.y };

        switch (this.direction.toUpperCase()) {
            case 'N':
                if (this.currentLocation.y < this.cols - 1 ) {
                    newLocation.y = this.currentLocation.y + 1
                } else {
                    newLocation.y = 0;
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'S':
                if (this.currentLocation.y > 0) {
                    newLocation.y = this.currentLocation.y - 1
                } else {
                    newLocation.y = this.cols - 1
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'E':
                if (this.currentLocation.x < this.rows - 1) {
                    newLocation.x = this.currentLocation.x + 1
                } else {
                    newLocation.x = 0
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;

            case 'W':
                if (this.currentLocation.x > 0) {
                    newLocation.x = this.currentLocation.x - 1
                } else {
                    newLocation.x = this.rows - 1;
                }
                if (this.isObstacle(newLocation.x, newLocation.y)) {
                    this.obstacleEncountered = true;
                    console.log(this.obstacleEncountered);
                    
                    alert("Obstacle detected");
                    break;
                } else {
                    this.move(newLocation);
                }
                break;
            default:
                console.log("Invalid Direction");

                break;
        }
    }    
}