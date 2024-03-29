let gameSeq=[];                                                                                            //created array of colors generated by game and track them intialy they are empty
let userSeq=[];                                                                                           //created array of colors clicked by user and track them intialy they are empty
let btns = ["yellow","purple","green","red"];                                                             //classes given to each div 
let started = false;                                                                                      //for begin
let level = 0;                                                                                            //to track level number
let h2=document.querySelector("h2");                                                                     //to select h2 heading as object 
let h3=document.querySelector("h3");                                                                     //to select h3 heading as object
let high=[];                                                                                             //for storing last highest score in array
let highest=0;                                                                                           //gives highest value from high(array) as a highest score

document.addEventListener("keypress",function(){                                                         //added keyboard event of "keypress" to start the game
    if(started==false){
        started=true;                                                                                   //started value changed to start game
        levelup();                                                                                      //call to the levelup function
    }
}) 

function levelup(){                                                                                       //function which level up the game  
    userSeq=[];                                                                                          //to tracj theuser input from starting 
    level++;                                                                                            //increment of level value
    h2.innerText=`level ${level}`;                                                                      //innertext of h2 changed with increased value of level

    //random color
    let randInd=Math.floor(Math.random()*3);                                                            //to generate ramdom number between 0 to 3
    let randColor=btns[randInd];                                                                        //to track randInd with index
    let randBtn= document.querySelector(`.${randColor}`);                                              //select randcolor as object
    gameSeq.push(randColor);                                                                              //pushig randcolor to gameseq array
    gameFlash(randBtn);                                                                                //for white flash 
    high.push(level);                                                                                 //for highest score calculation we added level value to high array
    
}

function gameFlash(btn){
    btn.classList.add("flash");                                                                       //to add css associated with the flash (white)
    setTimeout(() => {                                                                                //to timeout of 250msecfor above funtion
        btn.classList.remove("flash");                                                               //to remove the flash class
    }, 250);
}

function userFlash(btn){                                                                             //green flash after user click on any color
    btn.classList.add("userFlash");                                                                  //adding userFlash class to btn
    setTimeout(() => {
        btn.classList.remove("userFlash");                                                           //removing userflash class from btn 
    }, 250);
}


function checkAns(idx){                                                                              //for checking the sequence color generated by game and user selected color
    if(userSeq[idx] == gameSeq[idx]){                                                              //to check the ind of both userSeq and gameSeq
        if(userSeq.length==gameSeq.length){                                                       //cheking the length of both userSeq and gameSeq 
            setTimeout(levelup,1000);                                                             //timeout function of levelup after 1sec for give time between twolevels
            max(high);                                                                            //caling higest score function
            
        }
    } else{
        h2.innerHTML=`Game over! Your score is <b>${level-1}</b><br>Press any key to start again`; //user input not match 
        let body=document.querySelector("body").style.backgroundColor="red";                      //changing background color to red 
        setTimeout(() => {
            body=document.querySelector("body").style.backgroundColor="white";                     //timeout function for for agaun change red to white background
        }, 150);
        reset();                                                                                   //reset function called after wrong input
    }
}


let allBtns=document.querySelectorAll(".btn");                                                       //for create event of click on div by user welist all btns in allBtns
for(btn of allBtns){ 
    btn.addEventListener("click",btnPress);                                                         //click event on div then function called btnPress
}

function btnPress(){                                                                                //btnpress function 
    let btn = this;                                                                                  //here this is btn which called the btnPress
    userFlash(btn);                                                                                 //flash the button clicked by user in green
    let userColor= btn.getAttribute("id");                                                         //getting id attribute of btn
    userSeq.push(userColor);                                                                          //adding id of button to userSeq
    checkAns(userSeq.length-1);                                                                      //for check ans clicked by user 
}

function reset(){                                                                                 // reset function called after wrong input from user
    started=false;                                                                                  //to start again
    gameSeq=[];                                                                                   //empty the gamesequence
    userSeq=[];                                                                                 //empty the user sequence
    level=0;                                                                                       //making start with level 1 
     
}

function max(high){                                                                                 //function for highest value calculation 
    let maxi=0;                                                                                    //default variable to trak highest value
    for(let i = 0;i<high.length;i++){                                                               //loop for track each value in high array
        if(high[i]>maxi){                                                                            //logic 
            h=high[i];                                                                              //storing value
            h3.innerText=`Highest Score : ${h}`;                                                     //print highest value
        }
    }
}
