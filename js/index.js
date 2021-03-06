'use strict';
//	Пусть все твои JS-файлы всегда начинаются с такой строки, как выше. Она должна быть самая первая.


//	везде использовать var — тухлая тема.
//	https://learn.javascript.ru/let-const
//	используй const везде, где это возможно. в остальных 5% случаев используй let.


const generateBrickWall = (fromX, fromY) => {
	const HEIGHT_BRICKS = 20;
	const WIDTH_BRICKS = 14;

	const BRICK_SIZE = {
		height: 9,
		width: 14
	};

	const result = [];

	for (let brickX = 0; brickX < WIDTH_BRICKS; brickX += 1) {
		for (let brickY = 0; brickY < HEIGHT_BRICKS; brickY += 1) {

			result.push(Matter.Bodies.rectangle(
				fromX + brickX * BRICK_SIZE.width,
				fromY + brickY * BRICK_SIZE.height,
				BRICK_SIZE.width,
				BRICK_SIZE.height
			));
		}
	}

	return result;
};


const runMyShit = () => {
	const Engine = Matter.Engine, /// содержит методы для создания и управления движками
		Render = Matter.Render, ///базовый рендерер на основе холста HTML5. Этот модуль необходим для визуализации различных движков.
		World = Matter.World, /// используется для создания и управления миром, в котором работает движок
		Composites = Matter.Composites,
		Composite = Matter.Composite,
		Constraint = Matter.Constraint,
		Events = Matter.Events,
		Mouse = Matter.Mouse,
		MouseConstraint = Matter.MouseConstraint,
		Body = Matter.Body,
		Pair = Matter.Pair,
		Bodies = Matter.Bodies; ////позволяет создавать объекты твердого тела

	const engine = Engine.create(); ///создания нового движка

	const SCREEN_SIZE = {
		width: document.body.clientWidth,
		height: document.body.clientHeight
	};

	const render = Render.create({	/// создания нового рендерера
		element: window.document.body,	///ключ element, куда библиотека вставляет холст, можно поменять на canvas
		engine: engine, ///указание движка, который должен использоваться для визуализации мира
		options: {
			width: SCREEN_SIZE.width,
			height: SCREEN_SIZE.height,
			wireframes: false ////каркас
		}
	});

	/* const mouse = Matter.Mouse.create(render.canvas); */


	const ballA = Bodies.circle(500, 50, 30); ///круг x/y/радиус/
	Matter.Body.setMass(ballA, 1000);



	const GROUND_HEIGHT = 30;
	const ground = Bodies.rectangle(0, SCREEN_SIZE.height - GROUND_HEIGHT, SCREEN_SIZE.width, GROUND_HEIGHT, { isStatic: true });

	Matter.Body.rotate(ground, -Math.PI / 80 );

	World.add(engine.world, [
		Bodies.rectangle(160, SCREEN_SIZE.height - 2 * GROUND_HEIGHT, 110, GROUND_HEIGHT),
		ballA,
		
		ground,

		Bodies.rectangle(80, SCREEN_SIZE.height - 30 * GROUND_HEIGHT, 40, GROUND_HEIGHT, { isStatic: true }),
		Bodies.rectangle(160, SCREEN_SIZE.height - 10 * GROUND_HEIGHT, 60, GROUND_HEIGHT, { isStatic: true }),

		Bodies.rectangle(0, SCREEN_SIZE.height - 2 * GROUND_HEIGHT, 40, 2 * GROUND_HEIGHT, { isStatic: true })
	]);


	/* World.add(engine.world, Matter.MouseConstraint.create(engine, { mouse: mouse })); */





	//	это добавляет кирпичную стену
	World.add(engine.world, generateBrickWall(100, SCREEN_SIZE.height - 15 * GROUND_HEIGHT));


	const ballB = Bodies.circle(460, 5, 70, {collisionFilter: {group: -1},render: {sprite: {texture: "images/chick.png"}} }); ///кругляш
/* 	Matter.Body.setMass(ballB, 10), */
	///плотность

				
	const staticbrick = Bodies.rectangle(70, 200, 50, 20, { isStatic: true },{collisionFilter: {group: group} } );
	
			

        // Rope
       var group = Body.nextGroup(true);

        var rope = Composites.stack(370, 10, 2, 2, 2, 10, function(x, y) {
            return Bodies.rectangle(x, y, 50, 10,  { ///размеры блока
                collisionFilter: {
                     group: group 
                },
                render: {
                    sprite: {
                        texture: "images/rope2.png"
                    }
                }
            });
        });

        Composites.chain(rope,0.5, 0, -0.4, 0, { ///место стыка, угол стыка, взаимодействие междублоками, угол стыка
            stiffness: 0.8,
            length: 1
        });
        Composite.add(rope, Constraint.create({
            bodyB: ballB,
			bodyA: rope.bodies[0],
           pointB: {
                x: 0,
                y: -70
            }, 
            pointA: {
                x: -20,
                y: 0
            },  
            stiffness: 0.4,
			length: 0
        }));
		
		
		        Composite.add(rope, Constraint.create({
            bodyB: staticbrick,
			bodyA: rope.bodies[3],
            pointB: {
                x: 0,
                y: 17
            }, 
            pointA: {
                x: 20,
                y: 0
            },  
            stiffness: 0.4,
			length: 0
        }));

;


				
				
World.add(engine.world, [
			rope, 
			ballB,
			staticbrick,
			/* Matter.Constraint.create({ bodyA: rope[0], bodyB: ballB [1] }), */
			]);


	/*	Фрагмент кода ниже добавляет 3 шарика, соединенных попарно жесткой связью*/
	const connectedBalls = [
		Bodies.circle(100, 50, 30), ///номер 0
		Bodies.rectangle(100, 120, 25, 20), ///номер 1
		Bodies.circle(100, 80, 10)  ///номер 2
	];

	World.add(engine.world, [
		...connectedBalls,
		Matter.Constraint.create({ bodyA: connectedBalls[0], bodyB: connectedBalls[1] }),
		Matter.Constraint.create({ bodyA: connectedBalls[1], bodyB: connectedBalls[2]}),
		
	]);
	
	
	
	

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

World.add(engine.world, mouseConstraint);
	
	 render.mouse = mouse;
	
	    

	
		
const staticbrick2 = Bodies.rectangle(700, 200, 500, 200, { isStatic: true, restitution: 0.8, mass:4000  },{collisionFilter: {group: group} } );

let lives = 9;

	
const rrr = Bodies.rectangle(Math.random()*400 + 30, Math.random()*400 + 30, 60, 60, {collisionFilter: {group: group} } );
	
	
	var addSquare = function () {
	 return  Bodies.rectangle(Math.random()*400 + 30, Math.random()*400 + 30, 60, 60);
	};	
	
	
	
  Events.on(mouseConstraint, 'mousedown', function(event) {
/* 		var mousePosition = event.mouse.position;
        console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y); /// работает
         addSquare(engine); */
	let x = mouse.position.x;
    let y = mouse.position.y;	
	let object1;
	let object2;
	let object3;
	object1 = Bodies.rectangle(x+1, y+1, 10, 10);
	object2 = Bodies.rectangle(x+8, y, 10, 10);
	object3 = Bodies.rectangle(x, y+10, 10, 10);	
	World.add(engine.world, [
		
			object1,
			object2,
			object3
		
			])	 
        
    }); 	
	let pairId = Pair.id(staticbrick2,connectedBalls); ///не работает
		
	
	
		
	Events.on(engine, 'collisionStart', function(event) {
        var pairs = event.pairs;
		let x1 = rrr.position.x;
		let y1 = rrr.position.y;	
		let object4;
		let object41;
		let object42;
		let object43;
		let object44;
		let object45;
		
		
		let object5;
		let object6;
		object4 = Bodies.rectangle((rrr.position.x+74), (rrr.position.y-10), 2,2, {collisionFilter: {group: -2} } );
		object41 = Bodies.rectangle((rrr.position.x-72), (rrr.position.y-8), 2,2, {collisionFilter: {group: -2} } );
		object42 = Bodies.rectangle((rrr.position.x+41), (rrr.position.y-20), 2,2, {collisionFilter: {group: -2} } );
		object43 = Bodies.rectangle((rrr.position.x-35), (rrr.position.y-23), 2,2, {collisionFilter: {group: -2} } );
		object44 = Bodies.rectangle((rrr.position.x+25), (rrr.position.y-7), 2,2, {collisionFilter: {group: -2} } );
		object45 = Bodies.rectangle((rrr.position.x-28), (rrr.position.y-3), 2,2, {collisionFilter: {group: -2} } );
		
		

const generateBrickWall2 = (fromX, fromY) => {


	const brickInfo = {
		height: 100,
		width: 100
	};

	const result = [];

	for (let brickX = 0; brickX < staticbrick2.width; brickX++) {
		for (let brickY = 0; brickY < staticbrick2.height; brickY++) {

			result.push(Bodies.rectangle(
				fromX + brickX * brickInfo.width,
				fromY + brickY * brickInfo.height,
				brickInfo.width,
				brickInfo.height
			));
		}
	}

	return result;
};

		
/* 		object5 = Bodies.rectangle(550, 200, 250, 200, {collisionFilter: {group: group} } );
		object6 = Bodies.rectangle(800, 200, 250, 200, {collisionFilter: {group: group} } ); */
        for (var i = 0; i < pairs.length; i++) { ///отслеживание столкновения
            var pair = pairs[i];
	

		if (pair.bodyA === staticbrick2 && pair.bodyB === rrr) { ////выделил два конкретных тела и их соприкосновение или НЕТ?
			
		
		/* rrr.speed = rrr.speed + 0.5; */
		Body.applyForce( rrr, {x: rrr.position.x, y: rrr.position.y}, {x: 0, y: +40});
		

			lives--;
			pair.bodyB.render.fillStyle = '#333';
			Matter.World.add(engine.world, [
			object4,
			object41,
			object42,
			object43,
			object44,
			object45
			]);
		if (lives=0 || lives<0) {
		Matter.World.add (engine.world, [
/* 			object6,
			object5 */
			
			generateBrickWall2(700,200)
			]);
		
		Matter.World.remove(engine.world, staticbrick2);} }	 
			
		 /* else if (pair.bodyB === staticbrick2) { ///реакция на один конкретный объект
		pair.bodyB.render.fillStyle = '#333';
		
		}  */
		}
	});
			World.add(engine.world, [
			rrr,
			
			staticbrick2,		
		addSquare
			])
	Engine.run(engine); ///запуск движка
	Render.run(render); ///запуск рендера
	

	

};


window.onload = runMyShit;