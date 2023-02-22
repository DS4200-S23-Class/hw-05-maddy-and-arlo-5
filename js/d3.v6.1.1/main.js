// Homework 5 JS Code

const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// with a scale function
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 = d3.select('#Scatter')
				.append('svg')
					.attr('height', FRAME_HEIGHT)
					.attr('width', FRAME_HEIGHT)
					.attr('class', "frame");



d3.csv('data/scatter-data.csv').then((data) => {

	const MAX_X = d3.max(data, (d) => {
								return parseInt(d.x)
							});
    const MAX_Y = d3.max(data, (d) => {
								return parseInt(d.y)
							});

	const xscale = d3.scaleLinear()
            .domain([0, (MAX_X + 1)])
            .range([0, VIS_WIDTH]);
    const yscale = d3.scaleLinear()
            .domain([(MAX_Y + 1), 0])
            .range([0, VIS_HEIGHT]);

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
				.attr('r', 5)
				.attr('class', 'point');

	FRAME1.append('g')
			.attr('transform', 'translate(' + MARGINS.left + ',' 
												+ (MARGINS.top + VIS_HEIGHT) +')')
			.call(d3.axisBottom(xscale))
				.attr('font-size', '20px');

    FRAME1.append('g')
            .attr('transform', 'translate(' + MARGINS.left + ',' 
                                                    + MARGINS.top +')')
            .call(d3.axisLeft(yscale))
                    .attr('font-size', '20px');

    function pointHoveredOn(event, d) {
                        d3.select(this)
                            .style('fill', 'yellow');
                    }

    function pointHoveredOff(event, d) {
                        d3.select(this)
                            .style('fill', 'black');
                    }
                    
    function pointClicked(event, d) {
                        d3.select(this)
                            .style('fill', 'purple');
                    }

    // Add event listeners
    FRAME1.selectAll('points')
          .on('mouseover', pointHoveredOn)
          .on('mouseout', pointHoveredOff)
          .on('mouseclick', pointClicked); 
})



const FRAME2 = d3.select('#Barchart')
				.append('svg')
					.attr('height', FRAME_HEIGHT)
					.attr('width', FRAME_HEIGHT)
					.attr('class', "frame");

d3.csv('data/bar-data.csv').then((data) => {

    const MAX_X = data.length;
    const MAX_Y = d3.max(data, (d) => {
                                return parseInt(d.amount)
                            });

    const xscale = d3.scaleLinear()
            .domain([0, (MAX_X + 1)])
            .range([0, VIS_WIDTH]);
    const yscale = d3.scaleLinear()
            .domain([(MAX_Y + 1), 0])
            .range([0, VIS_HEIGHT]);

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

    FRAME2.append('g')
            .attr('transform', 'translate(' + MARGINS.left + ',' 
                                                + (MARGINS.top + VIS_HEIGHT) +')')
            .call(d3.axisBottom(xscale))
                .attr('font-size', '20px');

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