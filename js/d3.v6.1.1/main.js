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
                    console.log(d3.select(this));
                    let newText = 'Last Point Clicked ' + point.id; //not work
                    document.getElementById('selected_point').innerHTML = newText;
                    }

// frame for scatter axis
const FRAME1 = d3.select('.Left')
				.append('svg')
					.attr('height', FRAME_HEIGHT)
					.attr('width', FRAME_HEIGHT)
					.attr('class', "frame");

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
				.attr('class', 'point')
                .attr('id', (d) => {
                    return '(' + d.x + ', ' + d.y + ')'; }); // not work?

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
    let y = document.getElementById("selectY").value

    if (x != "X-Coordinate" && y != "Y-Coordinate"){

        console.log(x)
        console.log(y)
        const xscale = d3.scaleLinear()
                .domain([0, 10])
                .range([0, VIS_WIDTH]);
        const yscale = d3.scaleLinear()
                .domain([10, 0])
                .range([0, VIS_HEIGHT]);
        console.log(xscale(Number(x)) + MARGINS.left)
        console.log(yscale(Number(y)) + MARGINS.top)
        FRAME1.selectAll('.point')
                .append('circle')
                            .attr('cx', xscale(Number(x)) + MARGINS.left)
                            .attr('cy', yscale(Number(y)) + MARGINS.top)
                            .attr('r', 10)
                            .attr('fill', "black")
                            .attr('class', 'point')
                            .attr('id', (d) => {
                                return '(' + d.x + ', ' + d.y + ')'; })
                            .on('mouseover', pointHoveredOn)
                            .on('mouseout', pointHoveredOff)
                            .on('click', pointClicked);
}}
 
// Add button functionality
document.getElementById("subButton").addEventListener("click", addUserPoint)







// add frame for bar cahrt
const FRAME2 = d3.select('.Left')
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

    // scaling functions
    const xscale = d3.scaleLinear()
            .domain([0, (MAX_X + 1)])
            .range([0, VIS_WIDTH]);
    const yscale = d3.scaleLinear()
            .domain([(MAX_Y + 1), 0])
            .range([0, VIS_HEIGHT]);

    // adding each bar to chart
    FRAME2.selectAll('bars')
            .data(data)
            .enter()
            .append('rect')
                .attr('width', 10)
                .attr('length', (d) => {
                    return (yscale(d.amount) + MARGINS.top)
                })
                .attr('x', (d) => {
                    return (xscale(d.category) + MARGINS.left)
                })
                .attr('y', (VIS_HEIGHT + MARGINS.top))
                .attr('class', 'bar');

    // adding x axis
    FRAME2.append('g')
            .attr('transform', 'translate(' + MARGINS.left + ',' 
                                                + (MARGINS.top + VIS_HEIGHT) +')')
            .call(d3.axisBottom(xscale))
                .attr('font-size', '20px');

    // adding y axis
    FRAME2.append('g')
            .attr('transform', 'translate(' + MARGINS.left + ',' 
                                                    + MARGINS.top +')')
            .call(d3.axisLeft(yscale))
                    .attr('font-size', '20px');

    function handleMouseover(event, d) {
        }
    
    function handleMouseleave(event, d) {
        } 
    
    // Add event listeners
    FRAME2.selectAll(".point")
        .on("mouseover", handleMouseover)
        .on("mouseleave", handleMouseleave); 
    })