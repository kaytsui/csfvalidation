//Declare helper variables
var spriteIds = getSpriteIdsInUse();

for (var i = 0; i < spriteIds.length; i++) {
  if (getProp({id: spriteIds[i]}, "costume") == "sick" || getProp({id: spriteIds[i]}, "costume") == "sick_mask") {
    var spriteX=getProp({id: spriteIds[i]}, "x");
    var spriteY=400-getProp({id: spriteIds[i]}, "y");
    var spriteScale=getProp({id: spriteIds[i]}, "scale");
    var spriteRecovery=getProp({id: spriteIds[i]}, "recovery");
    if (spriteRecovery===0){
      spriteRecovery=recoveryTime;
    }
    push();
    stroke("black");
    strokeWeight(1);
    fill("white");
    rect(spriteX-(spriteScale/4),spriteY-(spriteScale/2)-10, spriteScale/2,5);
    fill("#49fb35");//neon green
    rect(spriteX-(spriteScale/4),spriteY-(spriteScale/2)-10, spriteScale*spriteRecovery/(recoveryTime*2),5);
    pop();
  }
}
