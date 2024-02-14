let p1 = 20;
let p2 = 20;
let p3 = 20;
let p4 = 20;
let p5 = 20;
let p6 = 20;
let p7 = 20;
let adv = false;
let acceptin = false;

try {
    //set placeholder values
    const p1lim = document.getElementById("p1lim");
        p1lim.setAttribute("placeholder", p1);
    const p2lim = document.getElementById("p2lim")
        p2lim.setAttribute("placeholder", p2);
    const p3lim = document.getElementById("p3lim")
        p3lim.setAttribute("placeholder", p3);
    const p4lim = document.getElementById("p4lim")
        p4lim.setAttribute("placeholder", p4);
    const p5lim = document.getElementById("p5lim")
        p5lim.setAttribute("placeholder", p5);
    const p6lim = document.getElementById("p6lim")
        p6lim.setAttribute("placeholder", p6);
    const p7lim = document.getElementById("p7lim")
        p7lim.setAttribute("placeholder", p7);
    const advlim = document.getElementById("advisory")
        advlim.setAttribute("placeholder", adv);

    const returnbtn = document.getElementById("Return");
    returnbtn.addEventListener("click", save);

    p1lim.addEventListener("input", setlim1);
    p2lim.addEventListener("input", setlim2);
    p3lim.addEventListener("input", setlim3);
    p4lim.addEventListener("input", setlim4);
    p5lim.addEventListener("input", setlim5);
    p6lim.addEventListener("input", setlim6);
    p7lim.addEventListener("input", setlim7);
    advlim.addEventListener("input", setadv);
} catch (error) {
    console.log("Not on adminset page, error: " + error.message);
}

try {
    const loginbtn = document.getElementById("Login");
    loginbtn.addEventListener("click", login);
} catch (error) {
    console.log("Not on admin page, error: " + error.message);
}



async function save() {
    if (acceptin) {
        p1 = document.getElementById("p1lim").value;
        p2 = document.getElementById("p2lim").value;
        p3 = document.getElementById("p3lim").value;
        p4 = document.getElementById("p4lim").value;
        p5 = document.getElementById("p5lim").value;
        p6 = document.getElementById("p6lim").value;
        p7 = document.getElementById("p7lim").value;
        adv = document.getElementById("advisory").value;
    } else {
        alert("Please login first.");
    }
    window.location.href = "index.html";
}

async function setlim1() {
    await setlim(1);
}

async function setlim2() {
    await setlim(2);
}

async function setlim3() {
    await setlim(3);
}

async function setlim4() {
    await setlim(4);
}

async function setlim5() {
    await setlim(5);
}

async function setlim6() {
    await setlim(6);
}

async function setlim7() {
    await setlim(7);
}

async function setlim(num) {
    const x = document.getElementById("p" + num + "lim").value;
    if (num === 1) {
        p1 = x;
    } else if (num === 2) {
        p2 = x;
    } else if (num === 3) {
        p3 = x;
    } else if (num === 4) {
        p4 = x;
    } else if (num === 5) {
        p5 = x;
    } else if (num === 6) {
        p6 = x;
    } else {
        p7 = x;
    }
}

async function setadv() {
    adv = document.getElementById("advisory").value;
    //save(adv, 8);
}

async function login() {
    const signUp = (e) => {
        e.preventDefault();
        try {
            console.log("logging in...");
        } catch (error) {
            console.log(error.message);
        }
    };

    const username = document.getElementById("UN").value;
    const password = document.getElementById("PW").value;
    let unhash = await sha512(username);
    let pwhash = await sha512(password);
    if (
        pwhash ===
        "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86" &&
        unhash ===
        "05ee170f46fd6040a23ebd883d63ef3b2aff55e3d6e01eccbc401088d7de0c153251c27e517ea4ad9bed62980366d1a47ceb312a659e77debda650d870094562"
    ) {
        window.location.href = "adminset.html";
        acceptin = true;
    } else {
        alert("Incorrect Username or Password");
    }
}

async function sha512(inputString) {
    // Convert the input string to an array buffer
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);

    // Generate the SHA-512 hash
    const hashBuffer = await crypto.subtle.digest("SHA-512", data);

    // Convert the hash buffer to a hexadecimal string
    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}