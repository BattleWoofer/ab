var gold = 0;
var AD = 1;
var attackSeconds = 3;

var zone = 1;
var enemyMaxHp = 5;
var enemyHp = 5;

var playerCurrentHp = 50;
var playerHp = 50;
var level = 1;
var exp = 0;
var expToNext = 6;

loadZone(0);
function loadZone(up){
    zone += up;
    enemyMaxHp = Math.floor(5 * Math.pow(1.25, zone - 1));
    enemyHp = enemyMaxHp;
    document.getElementById("zone").innerHTML = "Zone " + zone;
}
hpBar = document.getElementById("playerhpbar")
function hpBar(){
    hpBar.style.width = 100;
}

var lastFrameAt = 0;
function Update(timestamp){;
    delta = timestamp - lastFrameAt;
    if(delta > 20){
    console.log(delta + "ms")}
    window.requestAnimationFrame(Update)
    lastFrameAt = timestamp;
    delta = delta / 1000
    Charge(delta);
    enemyCharges(delta);
    barUpdate();

    ADCalc();
    document.getElementById("gold").innerHTML = "Gold: " + gold;

}
window.requestAnimationFrame(Update)

var attackCharge = 0;
function Charge(time){
    attackCharge += time;
    attackSeconds = 3 * Math.pow(0.99, level)
    if(attackCharge >= attackSeconds){
        Attack()
        attackCharge = 0;
        return
    }
}
var enemyCharge = 0;
function enemyCharges(time){
    enemyCharge += time;
    if(enemyCharge >= 2){
        enemyAttack()
        enemyCharge = 0;
        return
    }
}
function enemyAttack(){
    playerCurrentHp -= Math.floor(Math.pow(1.1, zone) * (zone * 0.5)) + 1
    if(playerCurrentHp <= 0){
        Die();
    }
}
function Die(){
    if(zone > 5){
        loadZone(-5)
    }else{
        loadZone((-1 * zone)+1)
    }
    playerLoadHp(1);
}


var levelFactor = 1;
function levelUp(){
    if(exp >= expToNext){
        exp = exp - expToNext;
        level++;
        expToNext = Math.floor(3.871 * Math.pow(1.5 + (0.05 * level), level))
        document.getElementById("leveltext").innerHTML = "Level " + level;
        playerLoadHp(0.15);
    }
}
function playerLoadHp(restore){
    levelFactor = Math.pow(1.15, level - 1)
    playerHp = (50 * levelFactor)
    playerCurrentHp += playerHp * restore;
}

document.getElementById("treepanel").style.display = "none"
document.getElementById("upgtab").addEventListener("click", function(a){
    document.getElementById("upgpanel").style.display = "block"
    document.getElementById("treepanel").style.display = "none"
})
document.getElementById("treetab").addEventListener("click", function(b){
    document.getElementById("treepanel").style.display = "block"
    document.getElementById("upgpanel").style.display = "none"

})

function Attack(){
    enemyHp -= AD
    if(enemyHp <= 0){kill()}
}
function kill(){
    gold  += Math.floor((2 * Math.pow(1.2, zone - 1)))
    enemyCharge = 0;
    playerLoadHp(0.15);
    if(playerCurrentHp > playerHp){playerCurrentHp = playerHp}
    exp += (Math.pow(1.4, zone-1))
    levelUp();
    loadZone(1)
}
document.getElementById("sword").addEventListener("click", function(buyS){
    buySword()
})
ADPurchase = 0;
function buySword(){
    if(gold >= Math.floor(4 * (Math.pow(1.5, ADPurchase)))){
    gold -= Math.floor(4 * (Math.pow(1.5, ADPurchase)))
    ADPurchase += 1;
    document.getElementById("sword").innerHTML = "Cost: " + Math.floor(4 * (Math.pow(1.5, ADPurchase)))}
}
function ADCalc(){
    AD = 1 + ADPurchase;
}
playerHpBar = document.getElementById("playerhpbar");
hpBar = document.getElementById("enemyhpbar")
expBar = document.getElementById("expbar")
attackBar = document.getElementById("attackbar")
function barUpdate(){
    hpBar.style.width = (400 * (enemyHp / enemyMaxHp )) + "px"
    hpBar.innerHTML = enemyHp + "/" + enemyMaxHp;
    playerHpBar.style.width = (400 * (playerCurrentHp / playerHp)) + "px";
    playerHpBar.innerHTML = Math.floor(playerCurrentHp) + "/" + Math.floor(playerHp);
    expBar.style.width = (200 * (exp / expToNext)) + "px"
    expBar.innerHTML = Math.floor((exp / expToNext) * 100) + "%"
    attackBar.style.width = (400 * (attackCharge / attackSeconds)) + "px"
    }
