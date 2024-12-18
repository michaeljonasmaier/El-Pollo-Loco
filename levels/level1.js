let collectableObjectsPositions = [];
const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        
    ],
        new Endboss(),
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
        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ],
    [
        new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setRandomPosition(), 60, 60),
        new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setRandomPosition(), 60, 60),
        new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setRandomPosition(), 60, 60),
        new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setRandomPosition(), 60, 60),
        new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setRandomPosition(), 60, 60)
    ],

    [
        new CollectableObject('img/8_coin/coin_1.png', setRandomPosition(), 50, 50),
        new CollectableObject('img/8_coin/coin_1.png', setRandomPosition(), 50, 50),
        new CollectableObject('img/8_coin/coin_1.png', setRandomPosition(), 50, 50),
        new CollectableObject('img/8_coin/coin_1.png', setRandomPosition(), 50, 50),
        new CollectableObject('img/8_coin/coin_1.png', setRandomPosition(), 50, 50),
        new CollectableObject('img/8_coin/coin_1.png', setRandomPosition(), 50, 50),
        new CollectableObject('img/8_coin/coin_1.png', setRandomPosition(), 50, 50),
        new CollectableObject('img/8_coin/coin_1.png', setRandomPosition(), 50, 50)
    ]

);


function setRandomPosition() {
    let position = 400 + Math.random() * 1500;
    position = checkOverlapping(position);
    collectableObjectsPositions.push(position)
    return position;
}

function checkOverlapping(oldPosition, attempts = 0) {
    const maxAttempts = 200;
    let newPosition = oldPosition;

    for (let position of collectableObjectsPositions) {
        let distance = Math.abs(newPosition - position);

        if (distance < 55) {
            if (attempts >= maxAttempts) {
                console.error("Keine gültige Position gefunden!");
                return newPosition;
            }
            newPosition = 400 + Math.random() * 500;
            return checkOverlapping(newPosition, attempts + 1);
        }
    }
    return newPosition;
}