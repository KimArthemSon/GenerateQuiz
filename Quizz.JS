let questions;
let currquestion = 0;
let questionsData = [];
const forms = document.getElementById("card"); 
const des = document.getElementById("Description"); 
const scoreboard = document.getElementById("Score"); 
const answer = document.getElementById("answer"); 
const last = document.getElementById("Last"); 
let copy = [];
let text;
let score = 0;
document.getElementById('fileInput').addEventListener('change', function(event) {
    reset();

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        text = e.target.result+"";
        readFile();
      };
      
      reader.onerror = function(e) {
        console.error('Error reading file', e);
      };
      
      reader.readAsText(file); 
    }
  });

function reset(){
     currquestion =0;
     questionsData = new Array();
     copy = new Array();
     des.textContent = "";
     score = 0;
     currquestion = 0;
     scoreboard.textContent = "";
     answer.value = "";

}
async function readFile() {
  try {

     questions = text.split("|");
     questions.splice(0, questions.length-1).map((e)=>{
        let data1 = e.split(";");
       data1[0] = data1[0].trim();
        data1[1]= data1[1].trim();
        let obj = {
            answer: data1[0],
            description: data1[1]
        }
        questionsData.push(obj);
     })
     copy = [...questionsData];
     start();
     console.log(questionsData);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

function start(){
    console.log(copy[currquestion].description);
   des.textContent = copy[currquestion].description;
}
forms.addEventListener("submit", (e)=>{
       e.preventDefault();

    console.log(e.value+"\n"+ (copy[currquestion].answer+"").toLowerCase())
    if((answer.value+"").toLowerCase() === (copy[currquestion].answer+"").toLowerCase()) score++;
    
   last.textContent = "Last Answer: "+copy[currquestion].answer;
   answer.value = "";
    scoreboard.textContent = "Score: "+score;
    
    start(RandomNextQuestion());
})


function RandomNextQuestion(){
    let newcopy = [];
    if (copy.length === 1) {
        copy = [...questionsData]; 
    } else {
        newcopy = copy.filter((e, i) => i !== currquestion); 
    }

   copy = [...newcopy];
    if (newcopy.length > 0) {
        currquestion = Math.floor(Math.random() * newcopy.length);
    }
}