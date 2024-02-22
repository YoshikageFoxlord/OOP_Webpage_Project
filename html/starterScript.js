"use strict";

function registerButton(){
    let div = document.getElementById("Button");
    div.style.backgroundColor = "purple";
    div.addEventListener("mouseover", () => {
       div.style.color="red";
    });
    div.addEventListener("mouseout", () => {
        div.style.color="unset"; //reset to default
    });
    div.addEventListener("click", () => {
        let history = document.getElementById("SpinLog");
        let newRow = document.createElement("tr");
        history.appendChild(newRow);

        let nums = [0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 16, 32, "00", 15, 8, 25, 1, 31, 26, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36];
        let index = Math.floor(Math.random() * 38);
        let num = nums[index];

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
    });
}

function appendTD(tr, value)
{
    let td = document.createElement("td");
    tr.appendChild(td);
    let txt = document.createTextNode(value);
    td.appendChild(txt);
}