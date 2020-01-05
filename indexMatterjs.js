var Engine = Matter.Engine, /// содержит методы для создания и управления движками
  Render = Matter.Render, ///базовый рендерер на основе холста HTML5. Этот модуль необходим для визуализации различных движков.
  World = Matter.World, /// используется для создания и управления миром, в котором работает движок
  Bodies = Matter.Bodies; ////позволяет создавать объекты твердого тела

var engine = Engine.create(5); ///создания нового движка

var render = Render.create({  /// создания нового рендерера
  element: document.body,  ///ключ element, куда библиотека вставляет холст, можно поменять на canvas
  engine: engine, ///указание движка, который должен использоваться для визуализации мира
  options: {
    width: 800,
    height: 1900,
    wireframes: false ////каркас
  }
});

var boxA = Bodies.rectangle(400, 200, 80, 60); ///прямоугольник
var ballA = Bodies.circle(500, 50, 30, 10); ///круг x/y/радиус/
var ballB = Bodies.circle(460, 10, 40, 10); ///круг
var ground = Bodies.rectangle(400, 1380, 810, 60, { isStatic: true });

World.add(engine.world, [boxA, ballA, ballB, ground]); ///добавление фигур в мир

Engine.run(engine); ///запуск движка

Render.run(render); ///запуск рендера