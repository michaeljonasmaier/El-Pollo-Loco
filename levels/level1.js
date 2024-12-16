const level1 = new Level([
    //new Chicken(),
    //new Chicken(),
    //new Chicken(),
    //new Chicken(),
    new Endboss(),
],
[
    new Cloud()
],
[
    new BackgroundObject('img/5_background/layers/air.png', -719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/air.png', 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/air.png', 719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/air.png', 719*2),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
    new BackgroundObject('img/5_background/layers/air.png', 719*3),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
],
[
    new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', 500, 100),
    new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', 800, 100),
    new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', 1100, 100),
    new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', 1500, 100),
    new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', 2000, 100)
]

);