// When reading an external data file such as a CSV or JSON file into a script, you must run a server. 
// You cannot directly open index.html with your browser.
// type python -m http.server in the terminal while in the directory where samples.json and index.html, as well as the script file, plots.js, are located


// display all the data in "sample.json"
d3.json("samples.json").then(function(data){
    console.log(data);
});

// display the metadata of any individual from the dataset

d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});