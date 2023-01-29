

    let form = document.querySelector('.main-form');
    let inputFullName = $('#input-full-name');
    let inputUserName = $('#input-name');
    let inputMail = $('#input-mail');
    let inputPassword = $('#input-password');
    let inputRepeatPassword = $('#input-repeat-password');
    let inputCheck = $('#input-check');
    let checkedInput = $('.checked-text');
    let hasError = false;
    $('.error').remove();
    $('.errorChecked').remove();
    //Пункт 2-3

    let numbers = /[0-9]/g;
    let punctuationMarks = /[,/.]/g

    // inputFullName.oninput = function () {
    //     this.value = this.value.replace(numbers, '');
    // }
    // inputUserName.oninput = function () {
    //     this.value = this.value.replace(punctuationMarks, '');
    // }

    //Пункт 4

    inputCheck.onchange = (event) => {
        if (event.currentTarget.checked) {
            console.log('Согласен');
        } else {
            console.log('Не согласен')
        }
    }

    //Пункт 5
    let submitBtn = document.querySelector('.btn');
    submitBtn.addEventListener('click', registration)

            let out = '';
    function registration() {
        const isValid = validateFormRegistration()
        if (isValid) {
            document.getElementsByClassName('popupSuccessMenu')[0].style.display = 'block';


            for (const input of inputAll) {
                inputsArray[input.id] = input.value;
            }
                inputsArray;
            console.log(inputsArray)
            // inputsArray.push(out)
           let clients = localStorage.getItem('clients');
            if (clients) {
                let clientsArray = JSON.parse(clients);
                clientsArray.push(inputsArray);
                localStorage.setItem('clients', JSON.stringify(clientsArray));
            } else {
                let clientsArray = [];
                clientsArray.push(inputsArray);
                localStorage.setItem('clients', JSON.stringify(clientsArray));
            }
            console.log(localStorage)
        }
    }

    const styleSuccess = {
        element: 'border-bottom',
        style: '2px solid green'
    }
    const styleFail = {
        element: 'border-bottom',
        style: '2px solid red'
    }

    const styleFailChecked = {
        element: 'color',
        style: 'red'
    }
    const styleSuccessChecked = {
        element: 'color',
        style: 'green'
    }

    function returnTextError(fieldName) {
        return `<div class="error">Необходимо ввести ${fieldName}</div>`
    }

    let formFields = form.elements;
    let inputsArray = {};
    let clientArray = [];
    let inputAll = Array.from(document.querySelectorAll('#myForm input'));

    function validateFormRegistration() {
        $('.error').remove();
        $('.errorChecked').remove();
        hasError = false;

        if (!inputFullName.val().match(/^[А-ЯA-Zа-яa-z\s]+\s*$/)) {
            inputFullName.after(returnTextError('Фамилию и Имя'));
            inputFullName.css(styleFail.element, styleFail.style)
            hasError = true;
        } else {
            inputFullName.css(styleSuccess.element, styleSuccess.style);
        }

        if (!inputUserName.val().match(/^[A-Za-z\s]+$/)) {
            inputUserName.after(returnTextError('Логин'));
            inputUserName.css(styleFail.element, styleFail.style);
            hasError = true;
        } else {
            inputUserName.css(styleSuccess.element, styleSuccess.style);
    }
        if (!inputMail.val().match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
            inputMail.after(returnTextError('Email'));
            inputMail.css(styleFail.element, styleFail.style);
            hasError = true;
        } else {
            inputMail.css(styleSuccess.element, styleSuccess.style);
        }

        if (!inputPassword.val().match(/(?=.*[А-ЯA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            inputPassword.after(returnTextError('Пароль'));
            inputPassword.css(styleFail.element, styleFail.style);
            hasError = true;
        } else {
            inputPassword.css(styleSuccess.element, styleSuccess.style);
        }

        if (!inputRepeatPassword.val().match(/(?=.*[А-ЯA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            inputRepeatPassword.after(returnTextError('Повторно Пароль'));
            inputRepeatPassword.css(styleFail.element, styleFail.style);
            hasError = true;
        } else {
            inputRepeatPassword.css(styleSuccess.element, styleSuccess.style);
        }

        if (inputPassword.val() !== inputRepeatPassword.val()) {
            inputRepeatPassword.after(returnTextError('Пароли не совпадают'));
            inputRepeatPassword.css(styleFail.element, styleFail.style);
            hasError = true;
        }
        if (!inputCheck.is(':checked')) {
            checkedInput.css(styleFailChecked.element, styleFailChecked.style);
            hasError = true;
        } else {
            checkedInput.css(styleSuccessChecked.element, styleSuccessChecked.style);
        }

        if(!hasError) {
            return true
        }

    }


    let closePopup = document.getElementsByClassName('popupBtn')[0];
    closePopup.onclick = function () {
        document.getElementsByClassName('popupSuccessMenu')[0].style.display = 'none';
        document.getElementById('myForm').reset();
        redirectToLogin();
    }

        let registrationBtn = document.querySelector('.main-span');
    function redirectToLogin() {

        document.getElementsByClassName('main-title')[0].innerText = 'Log in to the system';
        document.getElementById('inputFullName').remove();
        document.getElementById('mailInput').remove();
        document.getElementById('inputRepeatPassword').remove();
        document.getElementsByClassName('checkLabel')[0].remove();
        submitBtn.innerText = 'Sign In';
        registrationBtn.textContent = 'Registration';
        registrationBtn.style.textAlign = 'center';
        btnHaveAccount.removeEventListener('click', redirectToLogin)
        btnHaveAccount.onclick = () => {location.reload();}
        submitBtn.removeEventListener('click', registration);
        submitBtn.addEventListener('click', login);
    }


    function login () {
        validateLogin();
    }

    function validateLogin() {
        $('.error').remove();
        $('.errorChecked').remove();
        hasError = false;

        if (!inputUserName.val().match(/^[A-Za-z\s]+$/)) {
            inputUserName.after(returnTextError('Логин'));
            inputUserName.css(styleFail.element, styleFail.style);
            hasError = true;
        } else {
            inputUserName.css(styleSuccess.element, styleSuccess.style);
        }
        if (!inputPassword.val().match(/(?=.*[А-ЯA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            inputPassword.after(returnTextError('Пароль'));
            inputPassword.css(styleFail.element, styleFail.style);
            hasError = true;
        } else {
            inputPassword.css(styleSuccess.element, styleSuccess.style);
        }
        if(!hasError) {

            let clientsArray = localStorage.getItem('clients')
                clientsArray = JSON.parse(clientsArray);
            console.log(clientsArray)
           let userName = inputUserName.val();
           let userPassword = inputPassword.val();

           let user1 = clientsArray.find(item => item.id === 'igorius');
            console.log(user1)


        }
        // if (!inputUserName.value || !inputPassword.value) {
        //     alert('Заполните пустые поля!')
        // } else {
        //     alert('Добро пожаловать, ' + inputUserName.value + '!');
        // }
    }


//Пункт 6

    let btnHaveAccount = document.getElementsByClassName('main-span')[0];
    btnHaveAccount.addEventListener('click', redirectToLogin);






