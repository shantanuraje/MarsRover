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
    grid.render();
    grid.placeRover(inputData['x_coordinate'], inputData['y_coordinate'], inputData['direction']);
    
    
})
