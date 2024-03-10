"use strict";

function registerButton()
{
    let div = document.getElementById("Button");
    div.style.backgroundColor = "purple";
    div.addEventListener("mouseover", () => {
       div.style.color="red";
    });
    div.addEventListener("mouseout", () => {
        div.style.color="unset"; //reset to default
    });
    div.addEventListener("click", () => {
        let nums = [0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 16, 32, "00", 15, 8, 25, 1, 31, 26, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36];
        let index = Math.floor(Math.random() * 38);
        let num = nums[index];

        sendIt(index, num);
    });
}

function wheelWasSpun(index, num)
{
    let history = document.getElementById("SpinLog");
    let newRow = document.createElement("tr");
    history.appendChild(newRow);

    console.log(num);
    appendTD(newRow, num);
    if (index % 2 == 0)
    {
        console.log("Rouge");
        let td = document.createElement("td");
        newRow.appendChild(td);
        td.style.backgroundColor = "red";
    }
    else
    {
        console.log("Noir");
        let td = document.createElement("td");
        newRow.appendChild(td);
        td.style.backgroundColor = "black";
    }
    if ( num == "00" || (num % 2 == 0 && num != 0) )
    {
        console.log("Pair");
        appendTD(newRow, "Pair");
    }
    else
    {
        console.log("Impair");
        appendTD(newRow, "Impair");
    }
    if (num == "00" || num > 18)
    {
        console.log("Passe");
        appendTD(newRow, "Passe");
    }
    else
    {
        console.log("Manque");
        appendTD(newRow, "Manque");
    }
}

function appendTD(tr, value)
{
    let td = document.createElement("td");
    tr.appendChild(td);
    let txt = document.createTextNode(value);
    td.appendChild(txt);
}

let sock;

function keyWasPressed(ev){
    if( ev.key === "Enter")
        sendIt();
}

function sendIt(index, num){
    console.log("HEY!")

    let data = String(index) + "," + String(num);
    console.log(data);
    sock.send(data);
}

function gotMessage(event){
    let data = JSON.parse(event.data);
    let index = data[0];
    let num = data[1];
    console.log(data);
    wheelWasSpun(index, num);
}

function main(){
    sock = new WebSocket("ws://"+document.location.host+"/sock");
    sock.addEventListener("open", ()=>{
        document.getElementById("sendbutton").disabled=0
        console.log("SOCK IS OPEN");
    });
    sock.addEventListener("message", gotMessage);

}

main();
