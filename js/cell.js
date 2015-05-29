// Задаем поведение ячеек, стадии жизни, смерти...все по правилам игры.
// Правила: Если количество соседних клеток меньше 2 или больше 3-х, клетка умерает.
//          Если количество соседних клеток === 3, то клетка оживает
//          Любая живая клетка с 2-мя либо 3-мя соседями живет до следующего поколения.

var Cell = function (x, y, grid) {
	var me = this;

	me.x = x;
	me.y = y;
	me.grid = grid;

	me.isAlive = false;

	me.getNeighbors = function(){

		return [me.grid.getCell(x-1, y-1),
				me.grid.getCell(x-1, y),
				me.grid.getCell(x-1, y+1),
				me.grid.getCell(x, y-1),
				me.grid.getCell(x, y+1),
				me.grid.getCell(x+1, y-1),
				me.grid.getCell(x+1, y),
				me.grid.getCell(x+1, y+1)];

	}

	me.shouldDie = function(){
		var livingNeighbors = me.getNeighbors().filter(function(c){
			return c.isAlive;
		});

		if(livingNeighbors.length < 2){
			return true;
		}

		if(livingNeighbors.length > 3){
			return true;
		}

		return false;
	}

	me.goodCell = function(ctx){
		var livingNeighbors = me.getNeighbors().filter(function(c){
			return c.isAlive;
		});
		ctx.fillStyle = 'green';


	}

	me.badCell = function(ctx){
        var livingNeighbors = me.getNeighbors().filter(function(c){
			return c.isAlive;
		});
		ctx.fillStyle = 'red';

	}

	me.shouldBeBorn = function(){
		var livingNeighbors = me.getNeighbors().filter(function(c){
			return c.isAlive;
		});

		if(livingNeighbors.length === 3){
			return true;
		}
		return false;
	}

	return me;
}