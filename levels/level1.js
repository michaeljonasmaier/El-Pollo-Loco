let collectableObjectsPositions = [];
let level1;
let gameHasStarted = false;

function initLevel(){
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
    
        ],
        new Endboss(),
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('img/5_background/layers/4_clouds/2.png', 500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 1500),
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
            new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setXPosition(), setYPosition(), 60, 60),
            new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setXPosition(), setYPosition(), 60, 60),
            new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setXPosition(), setYPosition(), 60, 60),
            new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setXPosition(), setYPosition(), 60, 60),
            new CollectableObject('img/6_salsa_bottle/salsa_bottle.png', setXPosition(), setYPosition(), 60, 60)
        ],
    
        [
            new CollectableObject('img/8_coin/coin_1.png', setXPosition(), setYPosition(), 50, 50),
            new CollectableObject('img/8_coin/coin_1.png', setXPosition(), setYPosition(), 50, 50),
            new CollectableObject('img/8_coin/coin_1.png', setXPosition(), setYPosition(), 50, 50),
            new CollectableObject('img/8_coin/coin_1.png', setXPosition(), setYPosition(), 50, 50),
            new CollectableObject('img/8_coin/coin_1.png', setXPosition(), setYPosition(), 50, 50),
            new CollectableObject('img/8_coin/coin_1.png', setXPosition(), setYPosition(), 50, 50),
            new CollectableObject('img/8_coin/coin_1.png', setXPosition(), setYPosition(), 50, 50),
            new CollectableObject('img/8_coin/coin_1.png', setXPosition(), setYPosition(), 50, 50)
        ],
    
        [
            new Cactus(setXPosition(), setYPosition()),
            new Cactus(setXPosition(), setYPosition()),
            new Cactus(setXPosition(), setYPosition()),
        ]
    
    );

    gameHasStarted = true;
}




function setXPosition() {
    let xPosition = 400 + Math.random() * 2000;
    xPosition = checkOverlapping(xPosition);
    collectableObjectsPositions.push(xPosition)
    return xPosition;
}

function checkOverlapping(oldPosition, attempts = 0) {
    const maxAttempts = 200;
    let newPosition = oldPosition;
    for (let position of collectableObjectsPositions) {
        let distance = Math.abs(newPosition - position);

        if (distance < 55) {
            if (attempts >= maxAttempts) {
                return newPosition;
            }
            newPosition = 400 + Math.random() * 500;
            return checkOverlapping(newPosition, attempts + 1);
        }
    }
    return newPosition;
}

function setYPosition() {
    let yPosition = Math.random();
    if (yPosition > 0 && yPosition < 0.33) {
        return 110;
    } else if (yPosition >= 0.33 && yPosition < 0.66) {
        return 70;
    } else {
        return 30;
    }
}