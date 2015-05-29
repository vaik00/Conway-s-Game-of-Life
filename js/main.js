// Основной скрипт, так сказать движок. Создание канвы, отлов событий и запуск состояний.

window.requestAnimationFrame = window.requestAnimationFrame ||
							   window.webkitRequestAnimationFrame ||
							   window.mozRequestAnimationFrame ||
							   window.oRequestAnimationFrame ||
							   window.msRequestAnimationFrame;


var Game = function(canvasId){
	var me = this;

	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext('2d');

	me.canvas = canvas;

	me.returning = false;
	me.isDebug = true;

	me.actors = [];

	var _mouseDown = false;
	var handleClick = function(event){
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		
		var i = Math.floor(x/grid.width);
		var j = Math.floor(y/grid.height);

		grid.getCell(i, j).isAlive = true;
		return;
	};
	canvas.addEventListener('mousedown', function(event){
		_mouseDown = true;
		handleClick(event);
		canvas.addEventListener('mousemove', handleClick);
	});

	me.canvas.addEventListener('mouseup', function(event){
		_mouseDown = false;
		canvas.removeEventListener('mousemove', handleClick);
	});

	me.clear = window.addEventListener('keydown',function(evt){
		if(evt.keyCode === 27){
		location.reload();
		console.log('cleared');
		console.log('esc');
		}
    });

	me.update = function(delta){
		me.actors.forEach(function(a){
			a.update(me, delta);
		});

	}
	me.draw = function(delta){
		me.actors.forEach(function(a){
			a.draw(ctx, delta);
		});

	}

	me.start = function(){
		me.running = true;

		var lastTime = Date.now();

		(function mainloop(){
			if(!me.running) return;
			window.requestAnimationFrame(mainloop);
			// current time in milliseconds
			var current = Date.now();
			// time elapsed in milliseconds since the last frame
			var elapsed = current - lastTime;		
			// update/draw

			me.update(elapsed);
			me.draw(elapsed);

			lastTime = current;
		})();

	}

	return me;
}

var game = new Game("game");

var grid = new Grid(0, 0, Math.floor(600/10), Math.floor(800/10), 10, 10);


window.addEventListener('keydown', function(evt){
	if(evt.keyCode != 27){
	grid.simulationOn = !grid.simulationOn;
	}
});

game.actors.push(grid);

game.start();