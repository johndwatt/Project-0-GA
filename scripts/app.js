// === CREDIT QUEST: 2238 - GAME OBJECT ===
const game = {
    //METRICS
    credits: 0,
    fuel: 100,
    oxygen: 100,
    radiation: 0,
    //INTERVAL SPEEDS
    countCreditsInt: 1000,
    fuelLossInt: 5000,
    oxygenLossInt: 3000,
    radGainInt: 1500,
    animateBounceInt: 2000,
    //CLEAR INTERVAL PLACEHOLDERS - DO NOT CHANGE!
    setCreditInterval: 0,
    setFuelInterval: 0,
    setOxygenInterval: 0,
    setRadInterval: 0,
    setBounceInterval: 0,
    startGame (){
        game.grabShipName();
        game.handleUpgradesAndCredits();
        game.fuelLoss();
        game.oxygenLoss();
        game.radGain();
        game.makeShipBounce();
        $("#welcome-container").addClass("hidden");
    }, 
    grabShipName (){
        const shipName = $("#spaceship-name").val();
        $("#named-ship").text(shipName);
    },
    handleUpgradesAndCredits (){
        game.setCreditInterval = setInterval(function (){
            if (game.credits < 10000) {
                game.credits = game.credits += 100;
            } else if (game.credits >= 10000 && game.credits <= 99999){
                game.credits = game.credits += 1000;
                $("#spaceship-1").addClass("hidden");
                $("#spaceship-2").removeClass("hidden");
            } else if (game.credits >= 100000 && game.credits <= 999999) {
                game.credits = game.credits += 5000;
                $("#spaceship-2").addClass("hidden");
                $("#spaceship-3").removeClass("hidden");
            } else if (game.credits >= 1000000) {
                game.winCondition(game.credits);
            }
            $("#credit-count").text(`CURRENT CREDITS: ${game.credits}`);
        }, game.countCreditsInt);
    },
    fuelLoss (){
        game.setFuelInterval = setInterval(function (){
            if (game.fuel <= 0){
                game.loseCondition("fuel", game.credits);
            } else {
                game.fuel = game.fuel -= 20;
            }
            $("#fuel-count").text(`Fuel: ${game.fuel}%`);
        }, game.fuelLossInt);
    },
    oxygenLoss (){
        game.setOxygenInterval = setInterval(function (){
            if (game.oxygen <= 0){
                game.loseCondition("oxygen", game.credits);
            } else {
                game.oxygen = game.oxygen -= 20;
            }
            $("#oxygen-count").text(`Oxygen: ${game.oxygen}%`);
        }, game.oxygenLossInt);
    },
    radGain (){
        game.setRadInterval = setInterval(function (){
            if (game.radiation >= 100){
                game.loseCondition("radiation", game.credits);
            } else {
                game.radiation = game.radiation += 10;
            }
            $("#rad-count").text(`Radiation: ${game.radiation}%`);
        }, game.radGainInt);
    },
    addFuel (){
        if (game.fuel >= 100){
            game.fuel = 100;
        } else {
            game.fuel = game.fuel += 10;
        }
        $("#fuel-count").text(`Fuel: ${game.fuel}%`);
    },
    addOxygen (){
        if (game.oxygen >= 100){
            game.oxygen = 100;
        } else {
            game.oxygen = game.oxygen += 20;
        }
        $("#oxygen-count").text(`Oxygen: ${game.oxygen}%`);
    },
    reduceRad (){
        if (game.radiation <= 0){
            game.radiation = 0;
        } else {
            game.radiation = game.radiation -= 20;
        }
        $("#rad-count").text(`Radiation: ${game.radiation}%`);
    },
    clearInts (){
        clearInterval(game.setCreditInterval);
        clearInterval(game.setFuelInterval);
        clearInterval(game.setOxygenInterval);
        clearInterval(game.setRadInterval);
        clearInterval(game.setBounceInterval);
    },
    loseCondition (statFail, score){
        game.clearInts();
        $("#spaceship-1, #spaceship-2, #spaceship-3").addClass("hidden");
        $("#explosion").removeClass("hidden");
        $("#loss-container").removeClass("hidden");
        $("#update-loss").text(`Uh oh! Looks like you failed to maintain your ${statFail}. You accumulated a total of ${score} credits.`);
    },
    winCondition(score){
        game.clearInts();
        $("#win-container").removeClass("hidden");
        $("#update-win").text(`You accumulated a total of ${score} credits and are able to retire!`);
    },
    makeShipBounce(){
        game.setBounceInterval = setInterval(function (){
            $("#spaceship-1, #spaceship-2, #spaceship-3").toggleClass("animate__animated animate__headShake");
        }, game.animateBounceInt);  
    },
    
}

// === Event Listeners ===
$("#start-btn").on("click", game.startGame);
$("#fuel-btn").on("click", game.addFuel);
$("#oxygen-btn").on("click", game.addOxygen);
$("#rad-btn").on("click", game.reduceRad);


//WORK IN PROGRESS
/*
    handleUpgradesAndCredits (){
        game.setCreditInterval = setInterval(function (){
            if (game.credits < 10000) {
                game.credits = game.credits += 100;
                //FIXME: problem - interval is still going at original pace, will need to stop and restart interval for this to work properly 
                //game.fuelLossInt = 5000;
                //game.oxygenLossInt = 3000;
                //game.radGainInt = 2000;
            } else if (game.credits >= 100000) {
                game.credits = game.credits += 5000;
                //game.fuelLossInt = 1000;
                //game.oxygenLossInt = 3000;
                //game.radGainInt = 1000;
            } else {
                game.credits = game.credits += 1000;
                //game.fuelLossInt = 300;
                //game.oxygenLossInt = 3000;
                //game.radGainInt = 1500;
            }
            $("#credit-count").text(`Current Credits: ${game.credits}`);
        }, game.countCreditsInt);
    },
*/
    /*metricLoss (stopIntVar, metric, metricStr, metricId, metricChange, interval){
        stopIntVar = setInterval(function (){
            if (metric <= 0){
                game.loseCondition(`${metricStr}`, game.credits);
            } else {
                metric = metric -= metricChange;
            }
            $(`${metricId}`).text(`${metricStr}: ${metric}%`);
        }, interval);
    },*/