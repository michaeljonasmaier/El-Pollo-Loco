let collectableObjectsPositions = [];
let level1;
let gameHasStarted = false;

function initLevel() {
    level1 = new Level(
        [
            new Chicken(enemyStartPosition(600), 370, 0.25, 60),
            new Chicken(enemyStartPosition(600), 370, 0.25, 60),
            new Chicken(enemyStartPosition(600), 370, 0.25, 60),
            new Chicken(enemyStartPosition(600), 370, 0.25, 60),

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
        ],

        []

    );

    gameHasStarted = true;
}

/**
 * sets random x position
 * @returns random x position
 */
function setXPosition() {
    let xPosition = 400 + Math.random() * 2000;
    xPosition = checkOverlapping(xPosition);
    collectableObjectsPositions.push(xPosition)
    return xPosition;
}

/**
 * checks if objects are overlapping, tries to reposition it for 200 times
 * @param {float} oldPosition - old position of object
 * @param {integer} attempts - attempts of repositioning it 
 * @returns the new position
 */
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

/**
 * randomizes the y position (3 options)
 * @returns the yPositiom
 */
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

/**
 * randomizes x position
 * @param {integer} factor - startposition factor
 * @returns x position
 */
function enemyStartPosition(factor) {
    return factor + Math.random() * 500;
}

/**
 * checks the progression of x of the character
 * @param {integer} characterPosition - current position if character
 * @param {object array} enemiesArr - array of all enemies
 */
function checkProgression(characterPosition, enemiesArr) {
    if (characterPosition > 900 && enemiesArr.length < 5) {
        spawnEnemies(enemiesArr, 1500, 0.8);
    }
}

/**
 * spawns new enemies on random positions and pushes them to array
 * @param {object array} enemiesArr - array of all enemies
 * @param {*} factor - startposition factor
 * @param {*} speedFactor - speed factor
 */
function spawnEnemies(enemiesArr, factor, speedFactor) {
    let newEnemies = [
        new Chicken(enemyStartPosition(factor), 320, speedFactor, 120), 
        new Chicken(enemyStartPosition(factor), 320, speedFactor, 120), 
        new Chicken(enemyStartPosition(factor), 320, speedFactor, 120), 
        new Chicken(enemyStartPosition(factor), 320, speedFactor, 120)
    ];
    newEnemies.forEach(enemy => {
        enemiesArr.push(enemy);
    });
}

/**
 * spawns new turbochickens
 * @param {object array} enemiesArr - array of all enemies
 */
function spawnTurbochickens(enemiesArr){
    let newEnemies = [
        new Turbochicken(enemyStartPosition(2800), 320, 120, true), 
        new Turbochicken(enemyStartPosition(2800), 320, 120, true), 
        new Turbochicken(enemyStartPosition(2800), 320, 120, true), 
        new Turbochicken(enemyStartPosition(2800), 320, 120, true),
        new Turbochicken(enemyStartPosition(1600), 320, 120, false), 
        new Turbochicken(enemyStartPosition(1600), 320, 120, false), 
        new Turbochicken(enemyStartPosition(1600), 320, 120, false)
    ];
    newEnemies.forEach(enemy => {
        enemiesArr.push(enemy);
    });
}