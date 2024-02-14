import firebase from "firebase/compat";

document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();

    const db = firebase.firestore();
})

async function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(console.log)
}

let email;
let period = 1;
let emailgood = false;
//const {adv} = require('./admin.js');

const submitbtn = document.getElementById("submit");
submitbtn.addEventListener("click", submit);

const emailinput = document.getElementById("email");
emailinput.addEventListener("input", setemail);

function setemail() {
    email = document.getElementById("email").value;
}

function checkemail() {
    if (email.includes("@wfbschools.com")) {
        emailgood = true;
    } else {
        alert("Please use you school issued email.")
        emailinput.value = "";
    }
}

function setperiod(advisory) {

    const now = new Date(),
        day = now.getDay(),
        hours = now.getHours();
    const time = hours + (now.getMinutes / 60);


    if (advisory) {
        //Check if day is Mon-Fri
        if (0 < day < 6) {
            if (9.1333 <= time <= 10.25) {
                period = 2;
            } else if (10.3167 <= time <= 11.1333) {
                period = 3;
            } else if (11.2 <= time <= 12.0167) {
                period = 4;
            } else if (13.0 <= time <= 13.8167) {
                period = 5;
            } else if (14.8833 <= time <= 14.7) {
                period = 6;
            } else if (14.7667 <= time <= 15.5833) {
                period = 7;
            }
        }
    } else {
        //Check if day is Mon-Fri
        if (0 < day < 6) {
            if (9.1667 <= time <= 10.0167) {
                period = 2;
            } else if (10.0833 <= time <= 10.9333) {
                period = 3;
            } else if (11.0 <= time <= 11.9167) {
                period = 4;
            } else if (12.9 <= time <= 13.75) {
                period = 5;
            } else if (13.8167 <= time <= 14.6667) {
                period = 6;
            } else if (14.7333 <= time <= 15.5833) {
                period = 7;
            }
        }
    }
}

function submit() {
    checkemail();
    setperiod();
    if (emailgood) {
        senddata();
    }
}

function senddata() {
    fetch('https://script.google.com/macros/s/AKfycbyM2UwzXa-fs4UlGbxwdqpjXSwoCi65GC19_07Jv5-_lzwdxxTENrSdwvyKNV3A3cgw4w/exec?gid=0', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            var1: email,
            var2: period
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });

}

//https://script.google.com/macros/s/AKfycbyM2UwzXa-fs4UlGbxwdqpjXSwoCi65GC19_07Jv5-_lzwdxxTENrSdwvyKNV3A3cgw4w/exec?gid=0
