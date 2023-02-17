// Homework 5 JS Code

const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50}

// with a scale function
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 = d3.select('#Scatter')
				.append('svg')
					.attr('height', FRAME_HEIGHT)
					.attr('width', FRAME_HEIGHT)
					.attr('class', "frame")



d3.csv('data/scatter-data.csv').then((data) => {

	const MAX_X2 = d3.max(data, (d) => {
								return parseInt(d.x)
							});

	console.log(MAX_X2)

	const xscale = d3.scaleLinear()
            .domain([0, MAX_X2+3])
            .range([0, VIS_WIDTH]);

	console.log(data);

	FRAME1.selectAll('points')
			.data(data)
			.enter()
			.append('circle')
				.attr('cx', (d) => {
					return (d.x+ MARGINS.left)
				})
				.attr('cy', MARGINS.top)
				.attr('r', 5)
				.attr('class', 'point');

	FRAME1.append('g')
			.attr('transform', 'translate(' + MARGINS.left + ',' 
												+ MARGINS.top +')')
			.call(d3.axisBottom(xscale))
				.attr('font-size', '20px');
})