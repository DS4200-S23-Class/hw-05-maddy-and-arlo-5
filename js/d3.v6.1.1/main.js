// Homework 5 JS Code

const FRAME_HEIGHT = 600;
const FRAME_WIDTH = 600;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// setting vis dmiensions
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;


// functions for event handling
function pointHoveredOn(event, d) {
                    d3.select(this).style('fill', 'yellow');
                }

function pointHoveredOff(event, d) {
                    d3.select(this)
                        .style('fill', 'black');
                }
                
function pointClicked(event, d) {
                    let point = d3.select(this)
                    point.classed('clicked', !point.node().classList.contains('clicked'));
                    
                    let x = (this.getAttribute('cx') - MARGINS.left) / VIS_WIDTH * 10

                    let y = (FRAME_HEIGHT - this.getAttribute('cy') - MARGINS.top) / VIS_HEIGHT * 10
                    let newText = 'Last Point Clicked: ' + x + ", " + y; 
                    document.getElementById('selected_point').innerHTML = newText;
                    }

// frame for scatter axis
const FRAME1 = d3.select('.Left')
				.append('svg')
					.attr('height', FRAME_HEIGHT)
					.attr('width', FRAME_HEIGHT)
					.attr('class', "frame")
                    .attr('id', "FRAME1");

// read in scatter data
d3.csv('data/scatter-data.csv').then((data) => {

    // set max values for scaling
	const MAX_X = d3.max(data, (d) => {
								return parseInt(d.x)
							});
    const MAX_Y = d3.max(data, (d) => {
								return parseInt(d.y)
							});

    // scaling functions
	const xscale = d3.scaleLinear()
            .domain([0, (MAX_X + 1)])
            .range([0, VIS_WIDTH]);
    const yscale = d3.scaleLinear()
            .domain([(MAX_Y + 1), 0])
            .range([0, VIS_HEIGHT]);


    // plotting points onto frame, assigning attributes
	FRAME1.selectAll('points')
			.data(data)
			.enter()
			.append('circle')
				.attr('cx', (d) => {
					return (xscale(d.x) + MARGINS.left)
				})
				.attr('cy', (d) => {
					return (yscale(d.y) + MARGINS.top)
				})
				.attr('r', 10)
				.attr('class', 'point');

    // add x axis
	FRAME1.append('g')
			.attr('transform', 'translate(' + MARGINS.left + ',' 
												+ (MARGINS.top + VIS_HEIGHT) +')')
			.call(d3.axisBottom(xscale))
				.attr('font-size', '20px');

    // add y axis
    FRAME1.append('g')
            .attr('transform', 'translate(' + MARGINS.left + ',' 
                                                    + MARGINS.top +')')
            .call(d3.axisLeft(yscale))
                    .attr('font-size', '20px');




    // Add event listeners
    FRAME1.selectAll('.point')
          .on('mouseover', pointHoveredOn)
          .on('mouseout', pointHoveredOff)
          .on('click', pointClicked); 
})

// Add point from user input
function addUserPoint() {
    let x = document.getElementById("selectX").value;
    let y = document.getElementById("selectY").value;


    if (x != "X-Coordinate" && y != "Y-Coordinate"){

        // scaling
        const xscale = d3.scaleLinear()
                .domain([0, 10])
                .range([0, VIS_WIDTH]);
        const yscale = d3.scaleLinear()
                .domain([10, 0])
                .range([0, VIS_HEIGHT]);

        // adding point
        let point = document.createElementNS("http:///www.w3.org/2000/svg", "circle");
        point.setAttribute("cx", xscale(x));
        point.setAttribute("cy", yscale(y));
        point.setAttribute("r", 10);
        document.getElementById('FRAME1').appendChild(point);

        // adding point functionality
        point.addEventListener("mouseover", pointHoveredOn);
        point.addEventListener("mouseout", pointHoveredOff);
        point.addEventListener("click", pointClicked);

}}
 
// Add button functionality
document.getElementById("subButton").addEventListener("click", addUserPoint);

// add frame for bar chart
const svg = d3.select('.Left')
				.append('svg')
					.attr('height', FRAME_HEIGHT)
					.attr('width', FRAME_HEIGHT)
					.attr('class', "frame");

// read in the bar chart data
d3.csv('data/bar-data.csv').then((data) => {


    // Max values for scaling functions
    const MAX_X = data.length;
    const MAX_Y = d3.max(data, (d) => {
                                return parseInt(d.amount)
                            });

    // *  scaling functions
     // const xscale = d3.scaleBand()
        //    .range([0, VIS_WIDTH]).padding(0, 4);
    // const yscale = d3.scaleLinear()
   //         .domain([(MAX_Y + 1), 0])
     //        .range([0, VIS_HEIGHT]); 


   // scaling functions
    let X_SCALE = d3.scaleBand().range([0, VIS_WIDTH]).padding(0.4)
    let Y_SCALE =  d3.scaleLinear().range([VIS_HEIGHT - 50,0]);

    let g = svg.append("g").attr("transform", "translate(" +100+","+100+")");

        X_SCALE.domain(data.map((d)=>{return d.category;}));
        Y_SCALE.domain([0,d3.max(data, (d)=> {return d.amount;})]);
        g.append("g").attr('transform','translate(0,' + (VIS_HEIGHT - 50) + ')')
            .call(d3.axisBottom(X_SCALE))

        g.append('g').call(d3.axisLeft(Y_SCALE).tickFormat((d)=>{
            return d;
        }).ticks(8));

    // append all bars to chart 
    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x", (d) => {return X_SCALE(d.category);})
        .attr("y", (d) => {return Y_SCALE(d.amount)})
        .attr("width", X_SCALE.bandwidth())
        .attr("height", (d) => {return VIS_HEIGHT - Y_SCALE(d.amount) -50;});

    // Tooltip

    const TOOLTIP = d3.select("#vis1")
                        .append("div")
                          .attr("class", "tooltip")
                          .style("opacity", 0);

    // event handler functions
    function handleMouseover(event, d) {
     
      TOOLTIP.style("opacity", 1);
    }
    function handleMousemove(event, d) {
      
      TOOLTIP.html("Name: " + d.category + "<br>Value: " + d.amount)
              .style("left", (event.pageX + 10) + "px") 
                                                          
              .style("top", (event.pageY - 50) + "px");
    }
    function handleMouseleave(event, d) {
      
      TOOLTIP.style("opacity", 0);
    }

    // Add event listeners
    g.selectAll(".bar")
          .on("mouseover", handleMouseover) //add event listeners
          .on("mousemove", handleMousemove)
          .on("mouseleave", handleMouseleave);    

    // Add x axis 
    g.append("g")
          .attr("transform", "translate(" + MARG.left +
                "," + (VIS_HEIGHT + MARG.top) + ")")
          .call(d3.axisBottom(X_SCALE).ticks(4))
            .attr("font-size", '20px');
    });


