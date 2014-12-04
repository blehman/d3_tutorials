console.log("HELLO YOUUUUUU");
function run_final_scatter_build() {
// globals:
var formatter = d3.format(",")

var margin = {top: 36, right: 200, bottom: 100, left: 100},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

	// function to transform a domain of date objects into a range of screen coordinates
var x = d3.scale.log()
    .range([0, width]);

    // function to transform a domain of numeric values into a range of screen coordinates
var y = d3.scale.log()
    .range([height, 0]);

	// function that thakes an input and transforms it into a specified range.
var minSize = 2;
var maxSize = 13;
var size_scale = d3.scale.linear()
    .range([minSize,maxSize]);

var tweet_type = d3.scale.ordinal()
	.domain(["Retweet","Tweet","Reply"])
	.range([1,2,3]);

	// function that returns one of 10 colors depending on the integer input
var color = d3.scale.category10();

	// d3.svg.axis is a predefined and you can change the options
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

	// d3.svg.axis is a predefined and you can change the options
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
	
	// adds an svg element to the DOM 
var svg = d3.select("#scatterFinal")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
  .append("g") // the 'g' element is just a container; also note: the indent is intentional
    .classed("graphContainer",true)
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // repositions the svg to the right 'margin.left' units and down 'margin.top' units



// MAIN  
//  scatter plot builder 
//  note: build_graph() takes one argument: the dataset 
function build_graph(tweetData){

var legend = d3.select("#scatterFinal").append("g");
var legend_width = 170;
var legend_height = 109;
var legend_x_transform = 450;
var legend_y_transform = 350;
var content_x_transform = 15;
var content_y_transform = 6;
var legend_content = d3.select("#scatterFinal").append("g");
var legend_text = d3.select("#scatterFinal").append("g");
var legend_circles_radius = 5;


//var l = d3.scale.linear()
//		.range([legend_height*0.9,0])
//var legendAxis = d3.svg.axis()
//		.scale(l)
//		.orient("left")
// set domanin
//console.log("[min,max]",d3.extent(tweetData,function(d){return d.listedCount})) 
//l.domain(d3.extent(tweetData,function(d){return d.listedCount}))

// adds the y axis and some added css
//legend.append("g")
//     .attr("class", "y axis")
//     .call(legendAxis)

var fake_data = ["GOOD STUFF","BAD STUFF","REGULAR STUFF","BEST STUFF"];
var color = d3.scale.category10();
var upperY = 14;
var lowerY = 0.85*legend_height;
  console.log("upperY,lowerY:",upperY,lowerY); 
var xcoords = [-6,26];
var xcoordsLength = xcoords.reduce(function(a, b) {return a + b;});
var arrowY = d3.scale.linear()
				.domain([minSize-1,maxSize+1])
				.range([lowerY,upperY])

	
// draw lines in legend
legend_content.append("line")
	.classed("lines",true)
  .attr("stroke","black")
	.attr("x1", xcoordsLength/2).attr("y1", upperY)
	.attr("x2", xcoordsLength/2).attr("y2", lowerY)
	.attr("transform","translate(" + legend_x_transform + "," + legend_y_transform+ ")");
legend_content.append("line")
    .classed("lines",true)
  .attr("stroke","black")
	.attr("x1", xcoords[0]).attr("y1",  upperY)
	.attr("x2", xcoords[1]).attr("y2",  upperY)
	.attr("transform","translate(" + legend_x_transform + "," + legend_y_transform+ ")");
legend_content.append("line")
    .classed("lines",true)
  .attr("stroke","black")
	.attr("x1", xcoords[0]).attr("y1",  lowerY)
	.attr("x2", xcoords[1]).attr("y2", lowerY)
	.attr("transform","translate(" + legend_x_transform + "," + legend_y_transform+ ")");
legend_content.append("circle")
	.classed("dots",true)
	.attr("cx",10)
	.attr("cy",upperY)
	.attr("r",maxSize)
  .style("opacity",0.5)
	.style("stroke","red")
	.style("stroke","red")
	.attr("transform","translate(" + legend_x_transform + "," + legend_y_transform+ ")");
legend_content.append("circle")
	.classed("dots",true)
	.attr("cx",10)
	.attr("cy",lowerY)
	.attr("r",minSize)
  .style("opacity",0.5)
	.style("stroke","red")
	.attr("transform","translate(" + legend_x_transform + "," + legend_y_transform+ ")");
  

  // create legend rectangle 
legend.append("rect")
	.classed("legend",true)
	.attr("height",legend_height)
	.attr("width",legend_width)
  .style("fill","white")
  .style("opacity",0.8)
	.attr("transform","translate(" + legend_x_transform + "," + legend_y_transform+ ")");

  // adjust content location
legend_content.attr("transform","translate(" + content_x_transform + "," + content_y_transform + ")")

  // print statment often used to test code
  console.log("building scatterplot.")
  
  // format strings 
  tweetData.forEach(function(d) {
      d.timeStamp = new Date(d.timeStamp);
      d.followersCount = +d.followersCount;
      d.followingCount = +d.followingCount;
      d.listedCount = +d.listedCount;
      d.statusesCount = +d.statusesCount;
      d.link = "https://twitter.com/"+d.displayName+"/status/"+d.tweetID
  });
  
  // set min/max values to define the domain of various functions
  size_scale.domain(d3.extent(tweetData,function(d) {return d.statusesCount})); 
  x.domain(d3.extent(tweetData, function(d) { return d.followingCount; }));
  y.domain(d3.extent(tweetData, function(d) { return d.followersCount; }));

  // adds the x axis
  svg.append("g")
      .attr("class", "x axis") // look at the .axis setings in style.css
      .attr("transform", "translate(0," + height +  ")")
      .call(xAxis) // calls the function that we created to use d3.svg.axis
    .append("text")
      .text("Following")
      .attr("x",width)
      .attr("dy", "-.5em")
      .style("stroke","white")
      .style("text-anchor", "end");
  
  // changes the x axis css that does not include the "Following" label
  d3.selectAll(".x.axis .tick.major text")
      .style("text-anchor", "end")
      .attr("dx", "-0.497664em")
      .attr("dy", ".1em")
	  .attr("transform", function(d) {
                return "rotate(-65)" 
                });
 
  // adds the y axis and some added css
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end") // additional css (http://mzl.la/1rC7zya)
      .text("Followers")
      .style("stroke","white"); // we can override the css here

  // joins the data, creates the circles, classes the circles as 'dot'
  circles = svg.selectAll(".dots")
      .data(tweetData)
    .enter().append("circle") // data binding (http://bost.ocks.org/mike/join/)
      .classed("dots",true)
      .attr("r", function(d){ return size_scale(d.statusesCount)})
      .attr("cx", function(d) { return x(d.followingCount); })
      .attr("cy", function(d) { return y(d.followersCount); })
      .attr("fill",function(d) {return color(tweet_type(d.activityType))})
      .style("stroke","white");

  // add click event handler 
  circles.on("click",function(event){
    window.open(event.link);
  })
  .on("mouseover",function(event){
    var selectedX = this.cx.baseVal.value
    var selectedY = this.cy.baseVal.value
    var selectedR = this.r.baseVal.value
    var selectedText=event.activityType
    var selectedStatuses=event.statusesCount
    
    d3.select(this)
      .transition()
      .duration(100)
      .delay(0)
      .attr("r",function(d){return 6*size_scale(d.statusesCount)})
   
    // add text for activity type
    d3.select(".graphContainer").append("text")
    .classed("mouseoverText",true)
    .text(event.activityType)
    .attr("x", selectedX+selectedR*6)
    .attr("y",selectedY+selectedR)
    .attr("fill",color(tweet_type(event.activityType)));
    
      // create legend arrow
	legend_content.append("path")
	.classed("arrow",true)
	.attr("transform","translate(" + (legend_x_transform+9) + "," + (legend_y_transform+arrowY(selectedR))+")"+" rotate(-60)")
    .attr("d","M2,2 L2,11 L10,6 L2,2")
    
      // create legend text
    legend_content.append("text")
    .classed("arrowText",true)
    .style("font-size",16)
    .text(formatter(selectedStatuses)+" statuses")
    .attr({x:0,y:0})
    .attr("transform","translate(" + (legend_x_transform+23) + "," + (legend_y_transform+arrowY(selectedR)+3)+")")
    
  })
  
  .on("mouseout",function(event){
    d3.selectAll(".mouseoverText").remove()
    d3.selectAll(".arrow").remove()
    d3.selectAll(".arrowText").remove()
    d3.select(this).transition()
      .duration(200)
      .delay(20)
      .attr("r",function(d){ return size_scale(d.statusesCount)})
  });
  console.log("built scatterplot")
}
  d3.csv("data/sample1000_withHeader_zerosEdited.csv", function(error, rawData) {
    console.log("loaded data")
    build_graph(rawData);
 });
}
Reveal.addEventListener('scatterFinal', function(event) {
    console.log("triggered final");
   if (!d3.select("#scatterFinal").classed("finished")){
      run_final_scatter_build();
      d3.select("#scatterFinal")
        .classed("finished",true)
   };
});
