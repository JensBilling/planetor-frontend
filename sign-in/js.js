let signUpUsername = '';
let signUpEmail = '';
let signUpPassword = '';

let signInUsername = '';
let signInPassword = '';
let responseMessage = document.getElementById('response-message');

function signUp() {

    signUpUsername = document.getElementById('sign-up-username');
    signUpEmail = document.getElementById('sign-up-email');
    signUpPassword = document.getElementById('sign-up-password');

    const jsonData = {'username': signUpUsername.value, 'password': signUpPassword.value, 'email': signUpEmail.value}

    fetch('https://planetor-production.up.railway.app/api/auth/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then((response) => {
            console.log(response);
            if (response.ok){
                responseMessage.innerHTML = "<h2>User created</h2>";
            } else {
                responseMessage.innerHTML = "<h2>Something went wrong</h2>";

            }
        })

    event.preventDefault();
}

function signIn(){
    signInUsername = document.getElementById('sign-in-username');
    signInPassword = document.getElementById('sign-in-password');

    const jsonData = {'username': signInUsername.value, 'password': signInPassword.value}

    fetch('https://planetor-production.up.railway.app/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then((response) =>  response.text())
        .then((text) => {
            if (text === "User not found!" || text === "Wrong password!") {
                responseMessage.innerHTML = "<h2>User not found!</h2>";
            } else {
                localStorage.setItem('user', signInUsername.value);
                localStorage.setItem('isLoggedIn', '1');
                localStorage.setItem('jwt', text);
                window.location.replace("http://jensbilling.se/planetor/");
            }
        });



    event.preventDefault();
}