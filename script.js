const themeIcon = document.getElementById("themeIcon");
const difficulty = document.getElementById("difficulty");
const newGamebtn = document.getElementById("newGameBtn");
const continueGameBtn = document.getElementById("continueGameBtn"); 
const messageBox = document.getElementById("messageBox");
const theme = localStorage.getItem("theme");
const timer = localStorage.getItem("timer");

if (theme === "dark"){
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    themeIcon.src = "sun.png";
}

themeIcon.addEventListener("click", function(){
    const body = document.body;
    const moon = "moon.png";
    const sun = "sun.png";
    
    if (body.classList.contains("light-mode")){
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        themeIcon.src = sun;
        localStorage.setItem("theme", "dark");
    }
    else{
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        themeIcon.src = moon;
        localStorage.setItem("theme", "light");
    }
})

newGamebtn.addEventListener("click",function(){
    seconds = 0;
    if (difficulty.value===""){
        messageBox.textContent = "Please select a difficulty level";
        messageBox.style.display = "block";
        setTimeout(function(){
            messageBox.style.display = "none";},1500);
        }

        else {
        localStorage.setItem("difficulty", difficulty.value);
        localStorage.removeItem("timer");
        localStorage.removeItem("gameBoard");
        localStorage.removeItem("moveHistory");
        localStorage.removeItem("hearts");
        window.location.href = "game.html";
        }
    })

    continueGameBtn.addEventListener("click",function(){
        const savedBoard = localStorage.getItem("puzzle");
        const savedTimer = localStorage.getItem("timer");
    if (!savedBoard || !savedTimer){
        messageBox.textContent = "No saved game found";
        messageBox.style.display = "block";
        setTimeout(function() {
            messageBox.style.display="none";
            
        }, 1500);
        
    }
    else
    window.location.href = "game.html";
    }
)