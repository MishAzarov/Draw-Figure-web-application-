let figures = ['line', 'rectangle', 'triangle', 'circle', 'ellipse']

let ququeDraw = [];
let valid;
let fName;
let fPoints = [];
let fRadius;
let fRadius1;
let fRadius2;
let fRGB = [];
let fRGBA = [];

function cl()
{

	let t = document.getElementById('t');
	document.getElementById('er').style.visibility = 'hidden';
	//console.log(t.value.split('\n'));

	for (let k = 0; k <t.value.split('\n').length; ++k)
	{
		valid = true;

		let p = false;
		let c = false;
		let b = false;
		let r = false;
		let r1 = false;
		let r2 = false;

		let el = t.value.split('\n')[k];

		//console.log(el);
		getName(el);
		if (el.match(/-p/) != null)
		{
			p = true;
			getPoints(el);
		}
		else
		{
			error();
		}
		if (el.match(/-c/) != null)
		{
			c = true;
			getRGB(el);
		}
		if (el.match(/-b/) != null)
		{
			b = true;
			getBackground(el);
		}
		if (el.match(/-r\s/) != null)
		{
			r = true;
			getRadius(el);
		}
		if (el.match(/-r1/) != null)
		{
			r1 = true;
			getRadius1(el);
		}
		if (el.match(/-r2/) != null)
		{
			r2 = true;
			getRadius2(el);
		}

		let figure = {
			name: fName,
			pointers: fPoints,
			r: fRadius,
			r1: fRadius1,
			r2: fRadius2,
			RGB: fRGB,
			RGBA: fRGBA
		};
		console.log(figure);
		chackValid(figure);
		ququeDraw[k] = figure;
		clearValue();
		if (valid === false)
		{
			clearValue();
			break;
		}
	}	
	objectDistribution(ququeDraw);
}

function drawError()
{
	document.getElementById('er').style.visibility = 'Visible';
}

function clearValue()
{
	fName = '';
	fPoints = [];
	fRadius = 0;
	fRadius1 = 0;
	fRadius2 = 0;
	fRGB = [];
	fRGBA = [];
}

function chackValid(figure)
{
	if (figure.name === 'line')
	{
		if (figure.pointers.length != 4)
		{
			error();
		}
	}
	
	if (figure.name === 'rectangle')
	{
		if (figure.pointers.length != 4)
		{
			error();
		}
	}
	
	if (figure.name === 'triangle')
	{
		if (figure.pointers.length != 6)
		{
			error();
		}
	}
	
	if (figure.name === 'circle')
	{
		if (figure.pointers.length != 2)
		{
			console.log('tyt');
			error();
		}
		if (figure.r === 0)
		{
			console.log('tyt');
			error();
		}
	}

	if (figure.name === 'ellipse')
	{
		if (figure.pointers.length != 2)
		{
			error();
		}
		if (figure.r1 === 0)
		{
			error();
		}
		if (figure.r2 === 0)
		{
			error();
		}
	}
}

function error()
{	
	valid = false;
	console.log('error');
}


function getName(str)
{
	for (let i = 0; i< figures.length; ++i)
	{
		if (str.match(figures[i]) != null)	
		{
			switch (str.match(figures[i])[0]) {
			  case 'line':
			    fName = str.match(figures[i])[0];
			   	//console.log('Name: ' + str.match(figures[i])[0]);
			    break;
			  case 'rectangle':
			  	fName = str.match(figures[i])[0];
			    //console.log('Name: ' + str.match(figures[i])[0]);
			    break;
			  case 'triangle':
			  	fName = str.match(figures[i])[0];
			    //console.log('Name: ' + str.match(figures[i])[0]);
			    break;
			  case 'circle':
			  	fName = str.match(figures[i])[0];
			  	//console.log('Name: ' + str.match(figures[i])[0]);
			  	break;
			  case 'ellipse':
			  	fName = str.match(figures[i])[0];
			  	//console.log('Name: ' + str.match(figures[i])[0]);
			  	break;	  
			  default:
			    error();
			}
		}
	}
}

function getPoints(str)
{
	let points = [];
	let p = /\[(?<p1>\d{1,3}),\s(?<p2>\d{1,3})\]?/g;
	let inP = /\[(?<p1>\d{1,3}),\s(?<p2>\d{1,3})\]?/;
	console.log(str.match(p));
	if (str.match(p) != null)
	{

		let l = 0;
		for (let i=0; i< str.match(p).length; ++i)
		{
			points[l] = (str.match(p)[i]).match(inP)[1];
			l=l+1;
			points[l] = (str.match(p)[i]).match(inP)[2];
			l=l+1;
			//console.log((str.match(p)[i]).match(inP));
		}
	}
	else
	{
		error();
	}
	fPoints = points;
	//console.log('Points : '+points);
}

function getRGB(str)
{
	let RGB = [];
	let c = /-c\srgb\((?<c1>\d{1,3}),\s(?<c2>\d{1,3}),\s(?<c3>\d{1,3})\)?/;
	//console.log(str.match(c));
	if (str.match(c) != null)
	{
		if (str.match(c).length === 4)
		{
			RGB[0] = str.match(c)[1];
			RGB[1] = str.match(c)[2];
			RGB[2] = str.match(c)[3];
			//console.log(RGB);
		}
		else
		{
			error();
		}
	}
	else
	{
		error();
	}
	fRGB = RGB;
}

function getBackground(str)
{
	let backRGBA = [];
	let b =/-b\srgba\((?<b1>\d{1,3}),\s(?<b2>\d{1,3}),\s(?<b3>\d{1,3}),\s(?<b4>1|0|0.\d{1,})\)/;
	//console.log(str.match(b));
	if (str.match(b) != null)
	{
		if (str.match(b).length === 5)
		{
			for (let i = 1; i<str.match(b).length; i++)
			{
				backRGBA[i-1] = str.match(b)[i];
			}
		}
		else
		{
			error();
		}
	}
	else
	{
		error();
	}
	fRGBA = backRGBA;
	//console.log('Back RGBA :'+backRGBA);
}

function getRadius(str)
{
	let r = /-r\s\d{1,3}/;
	let inR = /\d{1,3}/;
	if (str.match(r) != null)
	{
		fRadius = str.match(r)[0].match(inR)[0];
		//console.log('Radius = ' + str.match(r)[0].match(inR)[0]);
	}
	else
	{
		error();
	}
}

function getRadius1(str)
{
	let r1 = /-r1\s\d{1,3}/;
	let inR1 = /\d{1,3}/g;
	if (str.match(r1) != null)
	{
		fRadius1 = str.match(r1)[0].match(inR1)[1];
		//console.log('Radius1 = ' + str.match(r1)[0].match(inR1)[1]);
	}
	else
	{
		error();
	}
}
function getRadius2(str)
{
	let r2 = /-r2\s\d{1,3}/;
	let inR2 = /\d{1,3}/g;
	if (str.match(r2) != null)
	{	
		fRadius2 = str.match(r2)[0].match(inR2)[1];
		//console.log('Radius2 = ' + str.match(r2)[0].match(inR2)[1]);
	}
	else
	{
		error();
	}
}


function objectDistribution(quque)
{
	if (valid != false)
	{
		for (let i = 0; i<quque.length; i++)
		{
			switch (quque[i].name)
			{
				case 'line':
					drawLine(quque[i]);
				   	console.log('Draw Line');
				    break;
				case 'rectangle':
					drawRectangle(quque[i]);
				   	console.log('Draw Rect');
				    break;
				case 'triangle':
					drawTriangle(quque[i]);
				   	console.log('Draw Tr');
				    break;
				case 'circle':
					drawCircle(quque[i]);
				   	console.log('Draw Circle');
				    break;
				case 'ellipse':
					drawEllipse(quque[i]);
				   	console.log('Draw Ellipse');
				    break;                
			}
		}
	}
	else
	{
		drawError();
		ququeDraw = [];
	}
}


function drawLine(figure)
{
	let canvas = document.getElementById('canv');
	let ctx = canvas.getContext('2d');
	if (figure.RGB != 'undefained')
	{
		ctx.strokeStyle = "rgb(" + figure.RGB[0] + "," + figure.RGB[1] + "," + figure.RGB[2] + ")";
	}
	else
	{
		ctx.strokeStyle = 'black';
	}
	ctx.beginPath();
	ctx.moveTo(figure.pointers[0],figure.pointers[1]);
    ctx.lineTo(figure.pointers[2], figure.pointers[3]);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = "#000";
}

function drawRectangle(figure)
{
	let canvas = document.getElementById('canv');
	let ctx = canvas.getContext('2d');
	if (figure.RGB != 'undefained')
	{
		ctx.strokeStyle = "rgb(" + figure.RGB[0] + "," + figure.RGB[1] + "," + figure.RGB[2] + ")";
	}
	else
	{
		ctx.strokeStyle = 'black';
	}
	ctx.strokeRect(figure.pointers[0],figure.pointers[1],(figure.pointers[2]-figure.pointers[0]),(figure.pointers[3]-figure.pointers[1]));
	if (figure.RGBA != 'undefained')
	{
		ctx.fillStyle = "rgba(" + figure.RGBA[0] + "," + figure.RGBA[1] + "," + figure.RGBA[2] + "," + figure.RGBA[3] + ")";
		ctx.fillRect(figure.pointers[0],figure.pointers[1],(figure.pointers[2]-figure.pointers[0]),(figure.pointers[3]-figure.pointers[1]));	
	}
	ctx.strokeStyle = "#000";
}

function drawTriangle(figure)
{
	let canvas = document.getElementById('canv');
	let ctx = canvas.getContext('2d');
	if (figure.RGB != 'undefained')
	{
		ctx.strokeStyle = "rgb(" + figure.RGB[0] + "," + figure.RGB[1] + "," + figure.RGB[2] + ")";
	}
	else
	{
		ctx.strokeStyle = 'black';
	}
	ctx.beginPath();
    ctx.moveTo(figure.pointers[0],figure.pointers[1]);
    ctx.lineTo(figure.pointers[2],figure.pointers[3]);
    ctx.lineTo(figure.pointers[4],figure.pointers[5]);
    ctx.closePath();
    ctx.stroke();
    if (figure.RGBA != 'undefained')
	{
		ctx.fillStyle = "rgba(" + figure.RGBA[0] + "," + figure.RGBA[1] + "," + figure.RGBA[2] + "," + figure.RGBA[3] + ")";
		ctx.fill();
	}
	ctx.strokeStyle = "#000";
}

function drawCircle(figure)
{
	let canvas = document.getElementById('canv');
	let ctx = canvas.getContext('2d');
	if (figure.RGB != 'undefained')
	{
		ctx.strokeStyle = "rgb(" + figure.RGB[0] + "," + figure.RGB[1] + "," + figure.RGB[2] + ")";
	}
	else
	{
		ctx.strokeStyle = 'black';
	}
	ctx.beginPath();
	ctx.arc(figure.pointers[0],figure.pointers[1], figure.r, 0, 2 * Math.PI);
	ctx.closePath();
    ctx.stroke();
	if (figure.RGBA != 'undefained')
	{
		ctx.fillStyle = "rgba(" + figure.RGBA[0] + "," + figure.RGBA[1] + "," + figure.RGBA[2] + "," + figure.RGBA[3] + ")";
		ctx.fill();
	}
	ctx.strokeStyle = "#000";
}

function drawEllipse(figure)
{
	let canvas = document.getElementById('canv');
	let ctx = canvas.getContext('2d');
	if (figure.RGB != 'undefained')
	{
		ctx.strokeStyle = "rgb(" + figure.RGB[0] + "," + figure.RGB[1] + "," + figure.RGB[2] + ")";
	}
	else
	{
		ctx.strokeStyle = 'black';
	}
	ctx.beginPath();
	ctx.ellipse(figure.pointers[0],figure.pointers[1], figure.r1, figure.r2, Math.PI / 4, 0, 2 * Math.PI);
	ctx.closePath();
    ctx.stroke();
    if (figure.RGBA != 'undefained')
	{
		ctx.fillStyle = "rgba(" + figure.RGBA[0] + "," + figure.RGBA[1] + "," + figure.RGBA[2] + "," + figure.RGBA[3] + ")";
		ctx.fill();
	}
	ctx.strokeStyle = "#000";
}


