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
    // setTimeout(function () { grid.placeRover(inputData['x_coordinate'], inputData['y_coordinate'], inputData['direction']) }, 2000);
    grid.placeRover(inputData['x_coordinate'], inputData['y_coordinate'], inputData['direction'])
    console.log(grid.direction);
    
    //read path character by character and move rover 
    let i = 0;
    let length = inputData['movement_path'].length;
    let loop = setInterval(function(){
        if(i >= length || grid.obstacleEncountered){
            clearInterval(loop);
            return;
        }

        let move = inputData['movement_path'][i++].toUpperCase();
        console.log(move, grid.obstacleEncountered);
        
        grid[move]();
        
    }, 1000);

})

//navigation buttons
var forward = document.getElementById("forwardButton");
var backward = document.getElementById("backwardButton");
var left = document.getElementById("leftButton");
var right = document.getElementById("rightButton");

forward.onclick = function () {
    console.log("Moving Forward");
    grid.F();
}
backward.onclick = function () {
    console.log("Moving Backward");
    grid.B();
}
left.onclick = function () {
    console.log("turning left");
    grid.L();
}
right.onclick = function () {
    console.log("turning right");
    grid.R();
}
