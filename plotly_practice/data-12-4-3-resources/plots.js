function init() {
    
    // the d3.select() method is used to select the dropdown menu, which has an id of #selDataset. 
    //The dropdown menu is assigned to the variable selector.
    var selector = d3.select("#selDataset");

    // d3.json() method is used to read the data from samples.json. 
    //The data from the entire JSON file is assigned the (arbitrary) argument name data.
    // console.log(prints out the entire JSON file)
    d3.json("samples.json").then((data) => {
      console.log(data);
    //  The variable sampleNames is assigned to the array the names array (which contains the ID numbers of all the study participants) inside the data object 
    var sampleNames = data.names;
    
    // For each element in the array, a dropdown menu option is appended. 
    // The text of each dropdown menu option is the ID. Its value property is also assigned the ID.
    sampleNames.forEach((sample) => {
        selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}
  
init();

//The function optionChanged takes in an argument, named newSample, and logs it to the browser console. 
//Note the following:
//This function is declared in plots.js, but it is never called in plots.js. 
//It's instead called by the onchange attribute of the dropdown menu in index.html.
//The argument name newSample refers to the value of the selected menu option. 
//In index.html, onchange=optionChanged(this.value)passes the selected menu option's value to the optionChanged()function. 
//This function gives this information the argument name newSample. In other words,this.value and newSample are equivalent

function optionChanged(newSample) {
    // These two functions will use the ID number to create that specific individual's information panel and charts, respectively.
    buildMetadata(newSample);
    buildCharts(newSample);
  }

// buildMetadata takes in an ID as the argument 
function buildMetadata(sample) {
    //d3 reads in the json file and saves it as data
    d3.json("samples.json").then((data) => {
        // the array metadata is saved as a variable
        var metadata = data.metadata;
        // the metadata is filtered based on the ID of the participant
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        // the dictionary of the metadata for that particular ID is saved
        var result = resultArray[0];
        // appends the location of the participant to the panel 
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => PANEL.append("h6").text((key + ': ' + value)))})
    };
