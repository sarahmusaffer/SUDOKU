class SudokuUI{
    constructor(){
        this.messageBox = document.getElementById("messageBox");
this.endOverlay = document.getElementById("endOverlay");
this.endTitle = document.getElementById("endTitle");
this.endMessage = document.getElementById("endMessage");
    }

     showEndPanel(title, message) {
    this.endTitle.textContent = title;
    this.endMessage.textContent = message;
    this.endOverlay.style.display = "block";
}

    showMessage(message, keep = false) {
    this.messageBox.textContent = message;
    this.messageBox.style.display = "block";
    if (!keep) {
        const current = this;
        setTimeout(function () {
           current.messageBox.style.display = "none";
        }, 2000);
    }
}
}
export default SudokuUI;
