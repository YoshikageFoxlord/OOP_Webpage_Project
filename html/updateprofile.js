"use strict";

let flags = new Map();
flags.set("disabled", false);

function submit(){
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let dob = document.getElementById("birthdate").value;
    let file = document.getElementById("ppic").files[0];
    if(!file){
        console.log("No file!");
        return;
    }

    let R = new FileReader();
    R.addEventListener("load", () => {
        let profilepic = btoa(R.result);    //do base64 encoding
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let dob = document.getElementById("birthdate").value;
        let J = {
            firstName: fname,
            lastName: lname,
            birthDate: dob,
            pic: profilepic
        };
        fetch( "/updateprofile",
            {   method: "POST",
                body: JSON.stringify(J)
            }
        ).then( (resp) => {
            //can also use text(), blob(), or arrayBuffer()
            resp.json().then( (J) => {
                console.log("Server said:",J);
            });
        }).catch( (err) => {
            console.log("Uh oh",err);
        })
    });
    R.readAsBinaryString(file);
}

function generic_submit(target){
    let inputBox = this.getElementById("input-box");
    let type = inputBox.type;
    let input;

    if (type == 'file')
    {
        input = btoa(inputBox.files[0]);

        let reader = new FileReader();

        reader.onload = (event) => {target.src = event.target.result;};

        reader.readAsDataURL(inputBox.files[0]);
    }
    else
        input = inputBox.value;

    let myHeaders = new Headers({"type" : type});

    fetch( "/updateprofile",
        {   method: "POST",
            body: JSON.stringify(input),
            headers: myHeaders
        })
        .then( (response) => {
            if (response.status != 200)
            {
                console.log(response.statusText);
                let popWindow = document.getElementById("popWindow");
                let errorBox = popWindow.contentDocument.getElementById("input-error");
                errorBox.innerHTML = response.statusText;
                throw Error("Invalid input.");
            }
            return response.text();
        })
        .then((txt) => {
            let output = JSON.parse(txt);
            console.log("server said:", output);
            target.innerHTML = input;
            document.getElementById("user-info").classList.remove("disabled");
            flags.set("disabled", false);
            let popWindow = document.getElementById("popWindow");
            popWindow.style.display = 'none';

        }).catch( (err) => {
            console.log("Uh oh", err);
        });
}

function popup(caller, myType)
{
    if (!flags.get("disabled"))
    {
        let info = document.getElementById("user-info");
        info.classList.add("disabled");
        flags.set("disabled", true);

        let target = caller.nextElementSibling;
        let popWindow = document.getElementById("popWindow");
        popWindow.style.display = 'initial';
        popWindow.src = '/updateprofile?type=' + myType;

        popWindow.onload = () => {
            let my_generic_submit = generic_submit.bind(popWindow.contentDocument);
            let label = popWindow.contentDocument.getElementById("input-name");
            label.innerHTML = "New " + caller.innerHTML;
            let myButton = popWindow.contentDocument.getElementsByTagName("button")[0];
            myButton.addEventListener("click", () => { my_generic_submit(target) });
        };
    }
}

function popupFile(caller, myType)
{
    if (!flags.get("disabled"))
    {
        let info = document.getElementById("user-info");
        info.classList.add("disabled");
        flags.set("disabled", true);

        let target = caller;
        let popWindow = document.getElementById("popWindow");
        popWindow.style.display = 'initial';
        popWindow.src = '/updateprofile?type=' + myType;

        popWindow.onload = () => {
            let my_generic_submit = generic_submit.bind(popWindow.contentDocument);
            let label = popWindow.contentDocument.getElementById("input-name");
            label.innerHTML = "New Profile Pic";
            let myButton = popWindow.contentDocument.getElementsByTagName("button")[0];
            myButton.addEventListener("click", () => { my_generic_submit(target) });
        };
    }
}
