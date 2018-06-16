var inputForm = document.getElementById('input_data');
var inputData; //stores input data from form

var grid; // used as the main grid object

inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    inputData = {};
    //parse values from form
    for (var [key, value] of new FormData(inputForm).entries()) {
        inputData[key] = value;
    }

    console.log(inputData);
    //initialize the main grid object with number of rows and columns from form
    grid = new Grid(inputData['rows'], inputData['columns']);
    //render the grid
    grid.render(inputData['x_coordinate'], inputData['y_coordinate']);
    setTimeout(function () { grid.placeRover(inputData['x_coordinate'], inputData['y_coordinate'], inputData['direction']) }, 1000);

    for (let i = 0; i < inputData['movement_path'].length; i++) {
        const move = inputData['movement_path'][i];

        // setTimeout(function () {}, 3000);
        switch (move.toUpperCase()) {
            case 'F':
                if (!grid.obstacleEncountered) {
                    setTimeout(function () { grid.moveForward(); }, (i + 1) * 2000);
                    break;
                }
                console.log(move, grid.obstacleEncountered);
            case 'B':
                if (!grid.obstacleEncountered) {
                    console.log(move, grid.obstacleEncountered);
                    setTimeout(function () { grid.moveBackward(); }, (i + 1) * 2000);
                }

                break;
            case 'L':
                if (!grid.obstacleEncountered) {
                    console.log(move, grid.obstacleEncountered);
                    setTimeout(function () { grid.moveLeft(); }, (i + 1) * 2000);
                }

                break;
            case 'R':
                if (!grid.obstacleEncountered) {
                    console.log(move, grid.obstacleEncountered);
                    setTimeout(function () { grid.moveRight(); }, (i + 1) * 2000);
                }

                break;
            default:
                break;
        }

        console.log(grid.obstacleEncountered);



    }

})

//navigation buttons
var forward = document.getElementById("forwardButton");
var backward = document.getElementById("backwardButton");
var left = document.getElementById("leftButton");
var right = document.getElementById("rightButton");

forward.onclick = function () {
    console.log("moveForward");
    grid.moveForward();
}
backward.onclick = function () {
    console.log("moveBackward");
    grid.moveBackward();
}
left.onclick = function () {
    console.log("moveLeft");
    grid.moveLeft();
}
right.onclick = function () {
    console.log("moveRight");
    grid.moveRight();
}
