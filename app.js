let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#resetBtn");
let newGameBtn=document.querySelector("#newGameBtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0=true;
let count=0;
const winPattern=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


const resetGame=()=>
{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("BOX IS CLICKED");
        if(turn0)
        {
            box.innerText="O";
            box.style.color="#615055";
            turn0=false;
        }
        else
        {
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const disableBoxes=()=>
{
    for(let box of boxes)
    {
        box.disabled=true;
    }
}
const enableBoxes=()=>
{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>
{
    msg.innerText=`Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>{
    for(let pattern of winPattern){
        let pos1value=boxes[pattern[0]].innerText;
        let pos2value=boxes[pattern[1]].innerText;
        let pos3value=boxes[pattern[2]].innerText;
        if(pos1value!="" && pos2value!="" && pos3value!=""){
            if(pos1value===pos2value && pos2value===pos3value){
                // console.log("Winner");
                showWinner(pos1value);
            }
        }
    }
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

