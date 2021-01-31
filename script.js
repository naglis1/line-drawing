var count = 0;
var x0, x1, y0, y1;
var colored_ids1 = [];
var colored_ids2 = [];

function color(id) {
	if (count == 0 ) {
		
		count++;

		colored_ids1[0] = 'o' + id.charAt(1) + id.charAt(2);
		colored_ids2[0] = 'b' + id.charAt(1) + id.charAt(2);
		document.getElementById(colored_ids1[0]).classList.add('o');
		document.getElementById(colored_ids2[0]).classList.add('o');

		x0 = parseInt(id.charAt(2));
		y0 = parseInt(id.charAt(1));

	}
	else if (!document.getElementById(id).classList.contains('o') && count == 1) {
		
		count++;

		colored_ids1[1] = 'o' + id.charAt(1) + id.charAt(2);
		colored_ids2[1] = 'b' + id.charAt(1) + id.charAt(2);
		document.getElementById(colored_ids1[1]).classList.add('o');
		document.getElementById(colored_ids2[1]).classList.add('o');

		x1 = parseInt(id.charAt(2));
		y1 = parseInt(id.charAt(1));

		draw_lines(x0, y0, x1, y1);
	}
}

function draw_lines(x0, y0, x1, y1) {
	var dx = x1 - x0;
	var dy = y1 - y0;
	if (dx > 0 && dy >=0 && dx >= dy) {
		bresenhams(x0, y0, x1, y1);
		DDA(x0, y0, x1, y1);
		document.getElementById("vis").innerHTML = "Visual:";
		document.getElementById("vis1").innerHTML = "Visual:";
	}
	else {
		document.getElementById("vis").innerHTML = "SRYYY, not possible. I was too lazy to do write all the algorithm. ONLY from upper left somewhere to bottom right somewhere at less than 45 degree angle";
		document.getElementById("vis1").innerHTML = "SRYYY, not possible. I was too lazy to do write all the algorithm. ONLY from upper left somewhere to bottom right somewhere at less than 45 degree angle";
		reset();
	}
}

function bresenhams(x0, y0, x1, y1) {
	var id_0;
	var dx, dy, p, x, y, i=2;

	dx = x1 - x0;
	dy = y1 - y0;
	p = 2*dy - dx;

	x = x0;
	y = y0;

	while (x<x1) {
		x++;
		if (p < 0) {
			p = p + 2*dy;
		}
		else {
			p = p + 2*dy - 2*dx;
			y++;
		}
		id_0 = "b" + y.toString() + x.toString();
		colored_ids2[i] = id_0;
		document.getElementById(id_0).classList.add('o');
		i++;
	}
}

function DDA(x0, y0, x1, y1) {
	var id_0;
	var dx, dy, steps, xinc, yinc;
	
	dx = x1 - x0;
	dy = y1 - y0;

	yinc = dy/dx;

	for (var i = 2; i < dx+2; i++) {
		x0++;
		y0 = y0 + yinc;
		id_0 = 'o' + Math.round(y0).toString() + Math.round(x0).toString();
		colored_ids1[i] = id_0;
		document.getElementById(id_0).classList.add('o');
	}
}

function reset() {
	count = 0;
	colored_ids1.forEach(pixel => document.getElementById(pixel).classList.remove('o'));
	colored_ids2.forEach(pixel => document.getElementById(pixel).classList.remove('o'));
}
