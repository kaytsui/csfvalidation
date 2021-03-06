var spriteIds = getSpriteIdsInUse();
// Fail right away if they don't have any sprites
if (spriteIds.length < 1) {
  levelFailure(3, 'noSprites');
}

if (!validationProps.previous) {
  validationProps.previous = {}; // id => {logLength: 1}
}

if (!validationProps.successCriteria) {
  validationProps.successCriteria = {
    madePrompt: false,
    answeredPrompt: false,
    printedText: false,
    logIncreased: false,
    containsInput: false
  };
}

var allPrompts = getPromptVars();
var promptVars = Object.keys(allPrompts);
var printLog = getPrintLog();
var failTime = 30;

//check if they made any prompts
if(!validationProps.successCriteria.madePrompt){
  validationProps.successCriteria.madePrompt = promptVars.length>=1;
} else{
  //bump up the fail time if they did
  failTime = 300;
  //check for a non-null value in any prompt variable
  for (var prop in promptVars) {
    if(allPrompts[promptVars[prop]]!= null){
      //console.log(allPrompts[promptVars[prop]]);
      validationProps.successCriteria.answeredPrompt = true;
    }
  }
}

//any printed text?
if(printLog.length){
  validationProps.successCriteria.printedText=true;
  //more than last frame?
  if(printLog.length>validationProps.previous.logLength){
    validationProps.successCriteria.logIncreased=true;
  }
}
validationProps.previous = {
  logLength: printLog.length
};

//go through all the printed text and all prompts to see if they ever printed the text entered
for (var i = 0; i < printLog.length; i++) {
  for (var prop in promptVars) {
    var enteredText=allPrompts[promptVars[prop]];
    var printedText=printLog[i];
    if(printedText.includes(enteredText)){
      validationProps.successCriteria.containsInput = true;
    }
  }
} 

//Set the successTime the first time they've passed the two main criteria
if(validationProps.successCriteria.answeredPrompt&&validationProps.successCriteria.containsInput&&!validationProps.successTime){
  //console.log(World.frameCount);
  validationProps.successTime=World.frameCount;
}


if (!validationProps.successTime && World.frameCount > failTime) {
  if (!validationProps.successCriteria.madePrompt) {
    console.log('didntmakeprompt');
    levelFailure(3, 'addPrompt');
  } else if (!validationProps.successCriteria.answeredPrompt) {
    console.log('did not answer prompt');
    levelFailure(3, 'answerPrompt');
  } else if (!validationProps.successCriteria.printedText) {
    console.log('did not print');
    levelFailure(3, 'addPrintBlock');
  } else if (!validationProps.successCriteria.logIncreased) {
    console.log('didnt use event');
    levelFailure(3, 'printWhenAnswered');
  } else if (!validationProps.successCriteria.containsInput) {
    console.log('did not print user text');
    levelFailure(3, 'printVariable');
  }
}

var waitTime = 100;
if (World.frameCount - validationProps.successTime >= waitTime) {
  console.log('Generic success');
  levelFailure(0, 'genericExplore');
}

push();
if(!validationProps.successTime){
  fill(rgb(118,102,160));
  rect(0,390,(World.frameCount*400/failTime),10);
} else {
   fill(rgb(0,173,188));
  rect(0,390,((World.frameCount-validationProps.successTime)*400/waitTime),10);
}
pop();
