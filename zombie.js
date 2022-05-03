const inquirer = require('inquirer');

var counter = 0;

let data = {
    zombie: {
        health: 0,
        damage: 0
    },
    user: {
        health: 0,
        damage: 0
    }
}

function getRandom() {
    data.zombie.health = parseInt(Math.random() * (100 - 50) + 50);
    data.user.health = parseInt(Math.random() * (100 - 50) + 50);
} 

function checkHealth() {
    if (data.zombie.health <= 0) {
        console.log('You won the game!');
        process.exit();
    } else if (data.user.health <= 0) {
        console.log('You lost the game!');
        process.exit();
    } else {
        newRound();
    }
}

function newRound() {
    if (counter === 0) {
        getRandom();
        counter = counter + 1;
    }

    inquirer.prompt([{
        type: "list",
        message: "Guess a number",
        choices: ["1", "2", "3", "4", "5"],
        name: "userGuess",
    }]).then(function(res) {
        data.zombie.damage = parseInt(Math.floor(Math.random() * (10 - 5) + 5)).toString();
        data.user.damage = parseInt(Math.floor(Math.random() * (10 - 5) + 5)).toString();

        if (res.userGuess === data.zombie.damage) {

            data.zombie.health -= data.user.damage;
            console.log("You hit the zombie");
            console.log(`You are  ${data.user.health}, Zombie is ${data.zombie.health}`);
            checkHealth();

        } else {

            data.user.health -= data.zombie.damage;
            console.log("Zombie hit you");
            console.log(`You are  ${data.user.health}, Zombie is ${data.zombie.health}`);
            checkHealth();
        }
    });

} 
newRound();