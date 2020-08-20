
let view = {
	objectDistribution: function(quque, valid)
	{
		if (valid != false)
		{
			for (let i = 0; i<quque.length; i++)
			{
				switch (quque[i].name)
				{
					case 'line':
						this.drawLine(quque[i]);
					   	console.log('Draw Line');
					    break;
					case 'rectangle':
						this.drawRectangle(quque[i]);
					   	console.log('Draw Rect');
					    break;
					case 'triangle':
						this.drawTriangle(quque[i]);
					   	console.log('Draw Tr');
					    break;
					case 'circle':
						this.drawCircle(quque[i]);
					   	console.log('Draw Circle');
					    break;
					case 'ellipse':
						this.drawEllipse(quque[i]);
					   	console.log('Draw Ellipse');
					    break;                
				}
			}
		}
		else
		{
			this.drawError();
		}
	},

	drawLine: function(figure)
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
	},

	drawRectangle: function(figure)
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
	},

	drawTriangle: function(figure)
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
	},

	drawCircle: function(figure)
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
	},
	
	drawEllipse: function(figure)
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
	},

	drawError: function()
	{
		document.getElementById('er').style.visibility = 'Visible';
	}
}

let model = {
	figures: ['line', 'rectangle', 'triangle', 'circle', 'ellipse'],

	ququeDraw: [],
	valid: true,
	fName: '',
	fPoints: [],
	fRadius: 0,
	fRadius1: 0,
	fRadius2: 0,
	fRGB: [],
	fRGBA: [],

	cl: function()
	{

		let t = document.getElementById('t');
		document.getElementById('er').style.visibility = 'hidden';
		//console.log(t.value.split('\n'));

		for (let k = 0; k <t.value.split('\n').length; ++k)
		{
			this.valid = true;

			let p = false;
			let c = false;
			let b = false;
			let r = false;
			let r1 = false;
			let r2 = false;

			let el = t.value.split('\n')[k];

			//console.log(el);
			this.getName(el);
			if (el.match(/-p/) != null)
			{
				p = true;
				this.getPoints(el);
			}
			else
			{
				this.error();
			}
			if (el.match(/-c/) != null)
			{
				c = true;
				this.getRGB(el);
			}
			if (el.match(/-b/) != null)
			{
				b = true;
				this.getBackground(el);
			}
			if (el.match(/-r\s/) != null)
			{
				r = true;
				this.getRadius(el);
			}
			if (el.match(/-r1/) != null)
			{
				r1 = true;
				this.getRadius1(el);
			}
			if (el.match(/-r2/) != null)
			{
				r2 = true;
				this.getRadius2(el);
			}

			let figure = {
				name: this.fName,
				pointers: this.fPoints,
				r: this.fRadius,
				r1: this.fRadius1,
				r2: this.fRadius2,
				RGB: this.fRGB,
				RGBA: this.fRGBA
			};
			console.log(figure);
			this.chackValid(figure);
			this.ququeDraw[k] = figure;
			this.clearValue();
			if (this.valid === false)
			{
				this.clearValue();
				break;
			}
		}	
		view.objectDistribution(this.ququeDraw, this.valid);
	},

	clearValue: function()
	{
		this.fName = '';
		this.fPoints = [];
		this.fRadius = 0;
		this.fRadius1 = 0;
		this.fRadius2 = 0;
		this.fRGB = [];
		this.fRGBA = [];
	},

	chackValid: function(figure)
	{
		if (figure.name === 'line')
		{
			if (figure.pointers.length != 4)
			{
				this.error();
			}
		}
		
		if (figure.name === 'rectangle')
		{
			if (figure.pointers.length != 4)
			{
				this.error();
			}
		}
		
		if (figure.name === 'triangle')
		{
			if (figure.pointers.length != 6)
			{
				this.error();
			}
		}
		
		if (figure.name === 'circle')
		{
			if (figure.pointers.length != 2)
			{
				this.error();
			}
			if (figure.r === 0)
			{
				this.error();
			}
		}

		if (figure.name === 'ellipse')
		{
			if (figure.pointers.length != 2)
			{
				this.error();
			}
			if (figure.r1 === 0)
			{
				this.error();
			}
			if (figure.r2 === 0)
			{
				this.error();
			}
		}
	},

	error: function()
	{	
		this.valid = false;
		console.log('error');
	},


	getName: function(str)
	{
		for (let i = 0; i< this.figures.length; ++i)
		{
			if (str.match(this.figures[i]) != null)	
			{
				switch (str.match(this.figures[i])[0]) {
				  case 'line':
				    this.fName = str.match(this.figures[i])[0];
				   	//console.log('Name: ' + str.match(figures[i])[0]);
				    break;
				  case 'rectangle':
				  	this.fName = str.match(this.figures[i])[0];
				    //console.log('Name: ' + str.match(figures[i])[0]);
				    break;
				  case 'triangle':
				  	this.fName = str.match(this.figures[i])[0];
				    //console.log('Name: ' + str.match(figures[i])[0]);
				    break;
				  case 'circle':
				  	this.fName = str.match(this.figures[i])[0];
				  	//console.log('Name: ' + str.match(figures[i])[0]);
				  	break;
				  case 'ellipse':
				  	this.fName = str.match(this.figures[i])[0];
				  	//console.log('Name: ' + str.match(figures[i])[0]);
				  	break;	  
				  default:
				    this.error();
				}
			}
		}
	},

	getPoints: function(str)
	{
		let points = [];
		let p = /\[(?<p1>\d{1,3}),\s(?<p2>\d{1,3})\]?/g;
		let inP = /\[(?<p1>\d{1,3}),\s(?<p2>\d{1,3})\]?/;
		//console.log(str.match(p));
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
			this.error();
		}
		this.fPoints = points;
		//console.log('Points : '+points);
	},

	getRGB: function(str)
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
				this.error();
			}
		}
		else
		{
			this.error();
		}
		this.fRGB = RGB;
	},

	getBackground: function(str)
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
				this.error();
			}
		}
		else
		{
			this.error();
		}
		this.fRGBA = backRGBA;
		//console.log('Back RGBA :'+backRGBA);
	},

	getRadius: function(str)
	{
		let r = /-r\s\d{1,3}/;
		let inR = /\d{1,3}/;
		if (str.match(r) != null)
		{
			this.fRadius = str.match(r)[0].match(inR)[0];
			//console.log('Radius = ' + str.match(r)[0].match(inR)[0]);
		}
		else
		{
			this.error();
		}
	},

	getRadius1: function(str)
	{
		let r1 = /-r1\s\d{1,3}/;
		let inR1 = /\d{1,3}/g;
		if (str.match(r1) != null)
		{
			this.fRadius1 = str.match(r1)[0].match(inR1)[1];
			//console.log('Radius1 = ' + str.match(r1)[0].match(inR1)[1]);
		}
		else
		{
			this.error();
		}
	},
	
	getRadius2: function(str)
	{
		let r2 = /-r2\s\d{1,3}/;
		let inR2 = /\d{1,3}/g;
		if (str.match(r2) != null)
		{	
			this.fRadius2 = str.match(r2)[0].match(inR2)[1];
			//console.log('Radius2 = ' + str.match(r2)[0].match(inR2)[1]);
		}
		else
		{
			this.error();
		}
	}
}

let controller = {

	clickBut:function()
	{
		model.cl();
	}
}
