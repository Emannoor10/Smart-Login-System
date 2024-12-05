var user = document.querySelector(".user");
var email = document.querySelector(".email");
var emailsign = document.querySelector(".email-sign");
var passsign = document.querySelector(".password-sign");
var pass = document.querySelector(".password");
var username = document.querySelector(".username");
var submit = document.querySelector(".submit");
var login = document.querySelector(".login");
var logout = document.querySelector(".btn-outline-warning");
var text = document.querySelector(".text");



var allarray = [];
if (localStorage.getItem("allarray") == null){
    allarray =[];
}else{
    allarray =JSON.parse(localStorage.getItem("allarray"));
}


function validmail(){
    var emailregex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var testing = emailregex.test(email.value);
    if(testing=== true){
        email.style.color="green";
        return true;
    }else{
        return false;
    }
}


function savedata() {
    if (user.value.trim() === "" || email.value.trim() === "" || pass.value.trim() === "") {
      text.innerHTML = "All inputs required";
       text.classList.add("red");
    } else if (allarray.some(element => element.email.toLowerCase() === email.value.toLowerCase())) { 
      text.innerHTML = "Email already exists.";
       text.classList.add("red");
    } else if (validmail()) {
        var element = {
            user: user.value.trim(),
            email: email.value.trim(),
            pass: pass.value.trim(),
        };
      text.innerHTML = "Success";
       text.classList.remove("red");
       text.classList.add("green");
        allarray.push(element);
        localStorage.setItem("allarray", JSON.stringify(allarray));
        window.location.href = "signin.html";
    } else {
      text.innerHTML = " enter a valid email.";
       text.classList.add("red");
    }
}

if(submit !=null){
    submit.addEventListener('click', function(){
        savedata()
    });
}

function checkperson(){
    if(emailsign.value != "" || passsign.value != ""){
      text.innerHTML="";
        if(check()){
            location.href="home.html";
        }else{
          text.innerHTML="incorrect email or password";
           text.classList.add("red");
        }
    }else{
      text.innerHTML="all inputs required";
           text.classList.add("red");
    }
}

function check(){
    for( var i =0 ; i<allarray.length; i++){
        if(allarray[i].email.toLowerCase() === emailsign.value.toLowerCase() &&allarray[i].pass.toLowerCase() === passsign.value.toLowerCase()){
            localStorage.setItem("name",JSON.stringify(allarray[i].user))
            return true;
        }    }
}

if(login !=null){
    login.addEventListener('click', function(){
        checkperson();
    });
}


  function adduser() {
    var storedName = JSON.parse(localStorage.getItem("name")); 
    var usernameElement = document.querySelector("#username"); 
    if (storedName && usernameElement) {
        usernameElement.innerHTML = `Welcome, ${storedName}`; 
    }
}

window.onload = adduser();

if (logout != null){
    logout.addEventListener('click', function(){
        location.href="signin.html"
        localStorage.removeItem("name")
    })
}