(function() {
    'use strict';
    window.addEventListener('load', function() {

    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.validationPassword.addEventListener('keypress', function(event) {
            var checkx = true;
            var chr = String.fromCharCode(event.which);

            var matchedCase = new Array();
            matchedCase.push("[!@#$%&*_?]");
            matchedCase.push("[A-Z]");
            matchedCase.push("[0-9]");
            matchedCase.push("[a-z]");

            for (var i = 0; i < matchedCase.length; i++) {
                if (new RegExp(matchedCase[i]).test(chr)) {			
                    checkx = false;
                }
            }

            if (form.validationPassword.value.length >= 20)
                checkx = true;

            if (checkx) {
                event.preventDefault();
                event.stopPropagation();	  
            }
        });

        var matchedCase = new Array();
        matchedCase.push("[$@$$!%*#?&]");
        matchedCase.push("[A-Z]");
        matchedCase.push("[0-9]");
        matchedCase.push("[a-z]");

        form.validationPassword.addEventListener('keyup', function() {
            var messageCase = new Array();
            messageCase.push(" Caráter Especial");
            messageCase.push(" Maiúsculas");
            messageCase.push(" Números");
            messageCase.push(" Minúsculas");

            var ctr = 0;
            var rti = "";

            for (var i = 0; i < matchedCase.length; i++) {
                if (new RegExp(matchedCase[i]).test(form.validationPassword.value)) {
                    if(i == 0) messageCase.splice(messageCase.indexOf(" Caráter Especial"), 1);
                    if(i == 1) messageCase.splice(messageCase.indexOf(" Maiúsculas"), 1);
                    if(i == 2) messageCase.splice(messageCase.indexOf(" Números"), 1);
                    if(i == 3) messageCase.splice(messageCase.indexOf(" Minúsculas"), 1);
                    ctr++;
                }
            }

            var progressbar = 0;
            var strength = "";
            var bClass = "";

            switch (ctr) {
                case 0:
                case 1: 
                    strength = "Muito fraco. ";
                    progressbar = 15;
                    bClass = "bg-danger";
                break;
                case 2:
                    strength = "Muito fraco. ";
                    progressbar = 25;
                    bClass = "bg-danger";
                break;
                case 3:
                    strength = "Fraco. ";	
                    progressbar = 34;
                    bClass = "bg-warning";			
                break;
                case 4:
                    strength = "Médio. ";
                    progressbar = 65;
                    bClass = "bg-warning";						
                break;
            }

            if (strength == "Medium" && form.validationPassword.value.length >= 8) {
                strength = "Strong";
                bClass = "bg-success";			
                form.validationPassword.setCustomValidity("");			
            } else {
                form.validationPassword.setCustomValidity(strength);
            }

            var sometext = "";

            if (form.validationPassword.value.length < 8) {
                var lengthI = 8 - form.validationPassword.value.length;
                sometext += ` ${lengthI} mais Caráteres, `;
            }

            sometext += messageCase;

            if (sometext) {
                sometext = " Você precisa de" + sometext;
            }

            $("#feedbackin, #feedbackirn").text(strength + sometext);
            $("#progressbar").removeClass( "bg-danger bg-warning bg-success" ).addClass(bClass);
            var plength = form.validationPassword.value.length ;

            if (plength > 0) progressbar += ((plength - 0) * 1.75);

            var  percentage = progressbar + "%";
            form.validationPassword.parentNode.classList.add('was-validated');
            $("#progressbar").width( percentage );

            if (form.validationPassword.checkValidity() === true) {
                form.verifyPassword.disabled = false;
            } else {
                form.verifyPassword.disabled = true;
            }
        });
    });
    }, false);
})();