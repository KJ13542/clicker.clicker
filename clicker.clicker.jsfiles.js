var clickerclickerInternalErrorPrefix = 11;
var clickerclickerExternalErrorPrefix = 12;

var cpsTickIntervalToggle = false;
var ruinTheFunToggle = false;

var autoclickEnabled = false;
var autoclickTps = 2;
var autoclickTemp;

var autosaveEnabled = true;
var autosaveTemp;

var clickAmount = 0;
var clickAmountClicked = 0;
var clickAmountClickedAssist = 0;
var clickAmountTotal = 1;

var achievementClickMoreTotal = false;
var achievementRuinedTheFun = false;

var genUpgrade1Cost = 1000000;
var genUpgrade1 = false;
var genUpgrade2Cost = 2000000;
var genUpgrade2 = false;

var clickerAmount = 0;
var clickerBaseCps = 1;
var clickerModifiedCps = 1;
var clickerTotalCps = 0;
var clickerCost = 50;
var clickerUpgrade1Cost = 250;
var clickerUpgrade1 = false;
var clickerUpgrade2Cost = 1000;
var clickerUpgrade2 = false;
var clickerUpgrade2Modifier = 0;
var clickerUpgrade3Cost = 2500;
var clickerUpgrade3 = false;
var clickerUpgrade3Modifier = 2;

var cursorAmount = 0;
var cursorClickIncrease = 1;
var cursorClickTotalIncrease = 0;
var cursorCost = 400;
var cursorUpgrade1Cost = 2500;
var cursorUpgrade1 = false;
var cursorUpgrade2Cost = 10000;
var cursorUpgrade2 = false;
var cursorUpgrade2Modifier = 0;
var cursorUpgrade3Cost = 50000;
var cursorUpgrade3 = false;
var cursorUpgrade3Modifier = 2;

function clickerclickerError(errorNumber, errorType) {
    "use strict";
    var errorMessage;
    if (errorType === "internal" || errorType === "Internal") {
        errorMessage = "ERROR " + clickerclickerInternalErrorPrefix;
        if (errorNumber < 10) { errorMessage = errorMessage + "0"; }
        errorMessage = errorMessage + errorNumber + ": ";
        if (errorNumber === 1) { errorMessage = errorMessage + errorType + " is not a valid Error Type"; }
        if (errorNumber === 2) { errorMessage = errorMessage + "Unable to read save code"; }
        if (errorNumber === 3) { errorMessage = errorMessage + "Unable to load save cookie (save_cookie does not exist)"; }
        if (errorNumber === 4) { errorMessage = errorMessage + "Unable to load save cookie (save_cookie does exist)"; }
        errorMessage = "ERROR " + clickerclickerInternalErrorPrefix + errorNumber + ": ";
        errorMessage = errorMessage + ".";
    } else if (errorType === "external" || errorType === "External") {
        errorMessage = "ERROR " + clickerclickerExternalErrorPrefix;
        if (errorNumber < 10) { errorMessage = errorMessage + "0"; }
        errorMessage = errorMessage + errorNumber + ": ";
        if (errorNumber === 1) { errorMessage = errorMessage + "Unused error"; }
    } else { clickerclickerError(1, "internal"); }
    window.alert(errorMessage);
    console.error(errorMessage);
}

function saveDisplayWrite(input) {
    "use strict";
    document.getElementById('saveDisplayArea').textContent = input;
}

function saveCodeGet() {
    "use strict";
    return "autoclickEnabled = " + autoclickEnabled + "; autoclickTps = " + autoclickTps + "; autoclickTemp = " + autoclickTemp + "; autosaveEnabled = " + autosaveEnabled + "; autosaveTemp = " + autosaveTemp + "; clickAmount = " + clickAmount + "; clickAmountClicked = " + clickAmountClicked + "; clickAmountClickedAssist = " + clickAmountClickedAssist + "; clickAmountTotal = " + clickAmountTotal + "; achievementClickMoreTotal = " + achievementClickMoreTotal + "; achievementRuinedTheFun = " + achievementRuinedTheFun + "; genUpgrade1Cost = " + genUpgrade1Cost + "; genUpgrade1 = " + genUpgrade1 + "; genUpgrade2Cost = " + genUpgrade2Cost + "; genUpgrade2 = " + genUpgrade2 + "; clickerAmount = " + clickerAmount + "; clickerBaseCps = " + clickerBaseCps + "; clickerModifiedCps = " + clickerModifiedCps + "; clickerTotalCps = " + clickerTotalCps + "; clickerCost = " + clickerCost + "; clickerUpgrade1Cost = " + clickerUpgrade1 + "; clickerUpgrade1 = " + clickerUpgrade1 + "; clickerUpgrade2Cost = " + clickerUpgrade2Cost + "; clickerUpgrade2 = " + clickerUpgrade2 + "; clickerUpgrade2Modifier = " + clickerUpgrade2Modifier + "; clickerUpgrade3Cost = " + clickerUpgrade3Cost + "; clickerUpgrade3 = " + clickerUpgrade3 + "; clickerUpgrade3Modifier = " + clickerUpgrade3Modifier + "; cursorAmount = " + cursorAmount + "; cursorClickIncrease = " + cursorClickIncrease + "; cursorClickTotalIncrease = " + cursorClickTotalIncrease + "; cursorCost = " + cursorCost + "; cursorUpgrade1Cost = " + cursorUpgrade1Cost + "; cursorUpgrade1 = " + cursorUpgrade1 + "; cursorUpgrade2Cost = " + cursorUpgrade2Cost + "; cursorUpgrade2 = " + cursorUpgrade2 + "; cursorUpgrade2Modifier = " + cursorUpgrade2Modifier + "; cursorUpgrade3Cost = " + cursorUpgrade3Cost + "; cursorUpgrade3 = " + cursorUpgrade3 + "; cursorUpgrade3Modifier = " + cursorUpgrade3Modifier + ";";
}

function saveCodeRun(input) {
    "use strict";
    eval(input);
}

function saveLoadRead() {
    "use strict";
    return document.getElementById('saveDisplayArea').value;
}

function achievementTick() {
    "use strict";
    if (clickAmount > clickAmountTotal && !achievementClickMoreTotal) {
        achievementClickMoreTotal = true;
        document.getElementById('achievementClickMoreTotalDisplay').style.visibility = "visible";
        window.alert("Achievement Received: Hacked Clicking");
    }
    if (ruinTheFunToggle && !achievementRuinedTheFun) {
        ruinTheFunToggle = false;
        achievementRuinedTheFun = true;
        document.getElementById('achievementRuinedTheFun').style.visibility = "visible";
        window.alert("Achievement Received: Ruined The Fun");
    }
}

function updateDisplays() {
    "use strict";
    document.title = "Clicks: " + clickAmount;
    document.getElementById('amountOf').innerHTML = clickAmount;
    if (!cursorUpgrade2) {document.getElementById('cursorIncreaseDisplay').innerHTML = cursorClickIncrease; } else { document.getElementById('cursorIncreaseDisplay').innerHTML = Math.round(cursorClickTotalIncrease / cursorAmount); }
    document.getElementById('clickerAmountDisplay').innerHTML = clickerAmount;
    document.getElementById('clickerTotalCpsDisplay').innerHTML = clickerTotalCps;
    document.getElementById('clickerCostDisplay').innerHTML = clickerCost;
    document.getElementById('clickerCpsDisplay').innerHTML = clickerModifiedCps;
    document.getElementById('cursorCostDisplay').innerHTML = cursorCost;
    document.getElementById('cursorAmountDisplay').innerHTML = cursorAmount;
    document.getElementById('cursorClickTotalIncreaseDisplay').innerHTML = cursorClickTotalIncrease;
    
    if (clickAmount > 9999 && clickAmountClicked > 999 && clickAmountTotal > 50000) { document.getElementById('genUpgrade1Display').style.visibility = "visible"; }
    if (clickAmount > 99999 && clickAmountClicked > 1999 && clickAmountTotal > 75000) { document.getElementById('genUpgrade2Display').style.visibility = "visible"; }
    
    if (clickerAmount > 0) { document.getElementById('clickerUpgrade1Display').style.visibility = "visible"; }
    if (clickerUpgrade1) { document.getElementById('clickerUpgrade2Display').style.visibility = "visible"; }
    if (clickAmountTotal > 999 && clickerUpgrade2) { document.getElementById('clickerUpgrade3Display').style.visibility = "visible"; }
    
    if (cursorAmount > 0) { document.getElementById('cursorUpgrade1Display').style.visibility = "visible"; }
    if (cursorUpgrade1) { document.getElementById('cursorUpgrade2Display').style.visibility = "visible"; }
    if (clickAmountTotal > 3499 && cursorUpgrade2) { document.getElementById('cursorUpgrade3Display').style.visibility = "visible"; }
    achievementTick();
}

function setClicks(amount) {
    "use strict";
    clickAmount = amount;
}

function addClicks(amount) {
    "use strict";
    clickAmount = clickAmount + amount;
    updateDisplays();
}

function regClick(amount) {
    "use strict";
    clickAmountTotal = clickAmountTotal + amount + cursorClickTotalIncrease;
    addClicks(amount + cursorClickTotalIncrease);
    clickAmountClicked = clickAmountClicked + 1;
    clickAmountClickedAssist = clickAmountClickedAssist + amount + cursorClickTotalIncrease;
}

function mouseClick() {
    "use strict";
    if (!autoclickEnabled) { regClick(1); }
}

function updateClicker() {
    "use strict";
    if (clickerUpgrade2) { clickerUpgrade2Modifier = Math.floor(clickerAmount * 0.1); }
    clickerModifiedCps = clickerBaseCps + clickerUpgrade2Modifier;
    clickerTotalCps = clickerAmount * (clickerBaseCps + clickerUpgrade2Modifier);
    if (clickerUpgrade3) {
        clickerTotalCps = clickerTotalCps * clickerUpgrade3Modifier;
        clickerModifiedCps = clickerModifiedCps * clickerUpgrade3Modifier;
    }
}

function addClicker(amount) {
    "use strict";
    clickerAmount = clickerAmount + amount;
    clickerCost = Math.floor(clickerCost * 1.05);
    updateClicker();
    updateDisplays();
}

function increaseClicker() {
    "use strict";
    if (clickAmount > clickerCost - 1) {
        clickAmount = clickAmount - clickerCost;
        addClicker(1);
    }
}

function clickerUpgrade(number) {
    "use strict";
    if (number === 1 && !clickerUpgrade1 && clickAmount > clickerUpgrade1Cost - 1) {
        clickAmount = clickAmount - clickerUpgrade1Cost;
        clickerUpgrade1 = true;
        document.getElementById('clickerUpgrade1DisplayText').innerHTML = "<strike><span id='clickerUpgrade1CostDisplay'>250c</span> - clicker Upgrade - Fatter Fingers (clickers get <b>+1 cpc</b>)</strike>";
        clickerBaseCps = clickerBaseCps + 1;
    }
    if (number === 2 && !clickerUpgrade2 && clickAmount > clickerUpgrade2Cost - 1) {
        clickAmount = clickAmount - clickerUpgrade2Cost;
        clickerUpgrade2 = true;
        document.getElementById('clickerUpgrade2DisplayText').innerHTML = "<strike><span id='clickerUpgrade2CostDisplay'>1000</span>c - clicker Upgrade - Mythical Pointer (clickers get <b>+0.1 cpc</b> for each clicker owned)</strike>";
    }
    if (number === 3 && !clickerUpgrade3 && clickAmount > clickerUpgrade3Cost - 1) {
        clickAmount = clickAmount - clickerUpgrade3Cost;
        clickerUpgrade3 = true;
        document.getElementById('clickerUpgrade3DisplayText').innerHTML = "<strike><span id='clickerUpgrade3CostDisplay'>2500</span>c - clicker Upgrade - <i>Plastic Tier</i> 1 - Sheet Plastic clickers (clickers are <b>twice</b> as efficient)</strike>";
    }
    updateClicker();
    updateDisplays();
}

function clickerPrice(newCost) {
    "use strict";
    clickerCost = newCost;
}

function updateCursor() {
    "use strict";
    if (cursorUpgrade2) { cursorUpgrade2Modifier = Math.floor(cursorAmount * 0.1); }
    cursorClickTotalIncrease = cursorAmount * (cursorClickIncrease + cursorUpgrade2Modifier);
    if (cursorUpgrade3) { cursorClickTotalIncrease = cursorClickTotalIncrease * cursorUpgrade3Modifier; }
}

function addCursor(amount) {
    "use strict";
    cursorAmount = cursorAmount + amount;
    cursorCost = Math.floor(cursorCost * 1.05);
    updateCursor();
    updateDisplays();
}

function increaseCursor() {
    "use strict";
    if (clickAmount > cursorCost - 1) {
        clickAmount = clickAmount - cursorCost;
        addCursor(1);
    }
}

function setCursor(amount) {
    "use strict";
    cursorAmount = amount;
    updateCursor();
    updateDisplays();
}

function cursorUpgrade(number) {
    "use strict";
    if (number === 1 && !cursorUpgrade1 && clickAmount > cursorUpgrade1Cost - 1) {
        clickAmount = clickAmount - cursorUpgrade1Cost;
        cursorUpgrade1 = true;
        document.getElementById('cursorUpgrade1DisplayText').innerHTML = "<strike><span id='cursorUpgrade1CostDisplay'>2500c</span> - Cursor Upgrade - Fatter Fingers (Cursors get <b>+1 cpc</b>)</strike>";
        cursorClickIncrease = cursorClickIncrease + 1;
    }
    if (number === 2 && !cursorUpgrade2 && clickAmount > cursorUpgrade2Cost - 1) {
        clickAmount = clickAmount - cursorUpgrade2Cost;
        cursorUpgrade2 = true;
        document.getElementById('cursorUpgrade2DisplayText').innerHTML = "<strike><span id='cursorUpgrade2CostDisplay'>10000</span>c - Cursor Upgrade - Mythical Pointer (Cursors get <b>+0.1 cpc</b> for each cursor owned)</strike>";
    }
    if (number === 3 && !cursorUpgrade3 && clickAmount > cursorUpgrade3Cost - 1) {
        clickAmount = clickAmount - cursorUpgrade3Cost;
        cursorUpgrade3 = true;
        document.getElementById('cursorUpgrade3DisplayText').innerHTML = "<strike><span id='cursorUpgrade3CostDisplay'>50000</span>c - Cursor Upgrade - <i>Plastic Tier</i> 1 - Sheet Plastic Cursors (Cursors are <b>twice</b> as efficient)</strike>";
    }
    updateCursor();
    updateDisplays();
}

function cursorPrice(newCost) {
    "use strict";
    cursorCost = newCost;
}

function cpsTick() {
    "use strict";
    if (!cpsTickIntervalToggle) {
        cpsTickIntervalToggle = true;
        setInterval("cpsTick()", 1000);
    }
    updateClicker();
    clickAmountTotal = clickAmountTotal + clickerTotalCps;
    clickAmount = clickAmount + clickerTotalCps;
    updateClicker();
    updateDisplays();
}

function autoclickEnable() {
    "use strict";
    autoclickTemp = setInterval("autoclickTick()", 1000 / autoclickTps);
    autoclickEnabled = true;
}

function autoclickDisable() {
    "use strict";
    clearInterval(autoclickTemp);
    autoclickEnabled = false;
}

function autoclickToggle() {
    "use strict";
    if (autoclickEnabled) { autoclickDisable(); } else { autoclickEnable(); }
}

function autoclickTick() {
    "use strict";
    if (autoclickEnabled) {
        regClick(1);
        achievementTick();
    }
}

function genUpgrade(number) {
    "use strict";
    if (number === 1 && !genUpgrade1 && clickAmount > genUpgrade1Cost - 1) {
        clickAmount = clickAmount - genUpgrade1Cost;
        genUpgrade1 = true;
        document.getElementById('genUpgrade1DisplayText').innerHTML = "<strike><span id='genUpgrade1CostDisplay'>1000000</span>c - Generic Upgrade - <i>Plastic Tier</i> 1 - Autoclick (Your click is disabled and <b>autoclicks 2</b> times a seccond)</strike>";
        document.getElementById('autoclickToggleDisplay').style.visibility = "visible";
        document.getElementById('autoclickToggleDisplay').scrollIntoView();
    }
    if (number === 2 && !genUpgrade2 && clickAmount > genUpgrade2Cost - 1) {
        clickAmount = clickAmount - genUpgrade2Cost;
        genUpgrade2 = true;
        document.getElementById('genUpgrade2DisplayText').innerHTML = "<strike><span id='genUpgrade2CostDisplay'>2000000</span>c - Generic Upgrade - <i>Wood Tier</i> 2 - Wooden Mouse (Autoclick speed is <b>doubled</b>)</strike>";
        autoclickTps = autoclickTps * 2;
        if (autoclickEnabled) {
            autoclickDisable();
            autoclickEnable();
        }
        document.getElementById('autoclickToggleDisplay').scrollIntoView();
    }
    updateDisplays();
    achievementTick();
}

function upgradeCostTicker() {
    "use strict";
    document.getElementById('cursorUpgrade1CostDisplay').innerHTML = cursorUpgrade1Cost;
    document.getElementById('cursorUpgrade2CostDisplay').innerHTML = cursorUpgrade2Cost;
    document.getElementById('cursorUpgrade3CostDisplay').innerHTML = cursorUpgrade3Cost;
}

function easterEggTick() {
    "use strict";
}

function tick() {
    "use strict";
    achievementTick();
}


function ruinTheFun() {
    "use strict";
    clickerPrice(0);
    cursorPrice(0);
    clickAmount = 999999999999999999999999;
    clickAmountClicked = 999999999999999999999999;
    clickAmountClickedAssist = 999999999999999999999999;
    clickAmountTotal = 1000000000000000000000000;
    clickerAmount = 999;
    cursorAmount = 999;
    ruinTheFunToggle = true;
    updateDisplays();
}

function achievementUnlockAll() {
    "use strict";
    achievementClickMoreTotal = true;
    achievementRuinedTheFun = true;
}


//TESTING

function getCookie(c_name) {
    "use strict";
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x === c_name) {
            return unescape(y);
        }
    }
}

function setSaveCookieInternal(c_name, value, exdays) {
    "use strict";
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function setSaveCookie(form) {
    "use strict";
    var save_cookie = saveCodeGet();
    if (save_cookie !== "") { setSaveCookieInternal("save_cookie", save_cookie, 365); } else { clickerclickerError(2, "internal"); }
}

function removeSaveCookie(c_name) {
    "use strict";
    setSaveCookieInternal(c_name, 0, -1);
}

function loadCookie() {
    "use strict";
    var save_cookie = getCookie("save_cookie");
    if (save_cookie !== null && save_cookie !== "") {
        saveCodeRun(save_cookie);
    } else {
        setSaveCookieInternal(save_cookie, "", 365);
    }
}

function autosave() {
    "use strict";
    setSaveCookie();
}

function autosaveEnable(time) {
    "use strict";
    autosaveTemp = setInterval("autosave()", time);
    autosaveEnabled = true;
}

function autosaveDisable() {
    "use strict";
    clearInterval(autosaveTemp);
    autoclickEnabled = false;
}

function autosaveToggle(time) {
    "use strict";
    if (autosaveEnabled) { autosaveDisable(); } else { autosaveEnable(time); }
}