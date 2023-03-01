console.log("linked");

const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left -MARGINS.right;

const FRAME1 = d3.select("#scatter-1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

const FRAME2 = d3.select("#scatter-2")
				  .append("svg")
				  	.attr("height", FRAME_HEIGHT)
				  	.attr("width", FRAME_WIDTH)
				  	.attr("class", "frame");

const FRAME3 = d3.select("#bar")
				  .append("svg")
				  	.attr("height", FRAME_HEIGHT)
				  	.attr("width", FRAME_WIDTH)
				  	.attr("class", "frame");

function colors(type) {
    if (type == "setosa") {
        return "hotpink"
    }
    if (type == "versicolor") {
        return "purple"
    }
    else {
        return "teal"
    }
}


 function plot_scatter_1() {

  d3.csv("data/iris.csv").then((data) => {
  const MAX_X6 = d3.max(data, (d) => { return parseInt(d.Petal_Length)});
  const X_SCALE6 = d3.scaleLinear() 
                      .domain([0, 8])  
                      .range([0, VIS_WIDTH]); 

  const MAX_Y6 = d3.max(data, (d) => {return parseInt(d.Sepal_Length)});
  const Y_SCALE6 = d3.scaleLinear() 
                      .domain([0, 7])  
                      .range([VIS_HEIGHT, 0]); 

  FRAME1.selectAll("points")  
        .data(data) // passed from .then  
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE6(d.Sepal_Length) + MARGINS.left); }) 
          .attr("cy", (d) => { return (Y_SCALE6(d.Petal_Length) + MARGINS.top); }) 
          .attr("r", 5)
          .attr("id", (d) => { return d.id })
          .attr("opacity", "50%")
          .attr("fill", function(d){return colors(d.Species) });


   FRAME1.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
            .call(d3.axisBottom(X_SCALE6).ticks(10))
            .attr("font-size", "15px");

    // make y axis
    FRAME1.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
            .call(d3.axisLeft(Y_SCALE6).ticks(10))
            .attr("font-size", "15px");

	});
}

plot_scatter_1();

function plot_scatter_2() {

  d3.csv("data/iris.csv").then((data) => {
  const MAX_X6 = d3.max(data, (d) => { return parseInt(d.Petal_Width)});
  const X_SCALE6 = d3.scaleLinear() 
                      .domain([0, 5])  
                      .range([0, VIS_WIDTH]); 

  const MAX_Y6 = d3.max(data, (d) => {return parseInt(d.Sepal_Width)});
  const Y_SCALE6 = d3.scaleLinear() 
                      .domain([0, 3])  
                      .range([VIS_HEIGHT, 0]); 

  FRAME2.selectAll("points")  
        .data(data) // passed from .then  
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE6(d.Sepal_Width) + MARGINS.left); }) 
          .attr("cy", (d) => { return (Y_SCALE6(d.Petal_Width) + MARGINS.top); }) 
          .attr("r", 5)
          .attr("id", (d) => { return d.id })
          .attr("opacity", "50%")
          .attr("fill", function(d){return colors(d.Species) });


   FRAME2.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
            .call(d3.axisBottom(X_SCALE6).ticks(10))
            .attr("font-size", "15px");

    // make y axis
    FRAME2.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
            .call(d3.axisLeft(Y_SCALE6).ticks(10))
            .attr("font-size", "15px");

	});
}

plot_scatter_2();

function plot_bar() {

  d3.csv("data/iris.csv").then((data) => {
		const X_SCALE6 = d3.scaleBand()
						.range([0, VIS_WIDTH + 1])
						.domain(data.map(function(d) {return d.Species}))
						.padding(.25);
		const Y_SCALE6 = d3.scaleLinear()
							.domain([0, 60])
							.range([VIS_HEIGHT, 0]);
		
		FRAME3.selectAll(".bar")
			  .data(data)
			  .enter()
			  .append('rect')
			  .attr("class", "bar")
			  .attr("x", (d) => { return X_SCALE6(d.Species) + MARGINS.left; })
			  .attr("y", (d) => { return Y_SCALE6(50) + MARGINS.top; })
			  .attr("width", 90)
			  .attr("height", (d) => {return VIS_HEIGHT - Y_SCALE6(50)})
			  .style("fill", function(d){return colors(d.Species) });


   FRAME3.append("g")
        .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
        .call(d3.axisBottom(X_SCALE6).ticks(10))
        .attr("font-size", "15px");


    FRAME3.append("g")
        .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
        .call(d3.axisLeft(Y_SCALE6).ticks(10))
        .attr("font-size", "15px");


     const TOOLTIP = d3.select("#bar").append("div")
      								   .attr("class", "tooltip")
      								   .style("opacity", "50%");

	});
}

plot_bar();



