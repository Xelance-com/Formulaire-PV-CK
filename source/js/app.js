function getDate() {
    let d = new Date();
    return d.toLocaleDateString("fr");
}

function getCodep() {
    let zip = document.getElementById("inputZip").value;
    return Number(String(zip).slice(0, 2));
}

function getParam(p) {
    var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const defaults = {
    speed: 300,
    easing: '',
    changeText: 0,
    showText: '',
    hideText: ''
};
function progress(nextWidth = "") {
    var nbQuestion = 7;
    var elem = document.getElementById("progressbar");
    var elemHidden = document.getElementById("widthHidden");
    var currentWidth = elemHidden.value;
    var widthAdd = Math.ceil(100 / nbQuestion);
    if (nextWidth === "") {
        var nextWidth = parseInt(currentWidth) + parseInt(widthAdd);
    }

    if (nextWidth >= 100) {
        elem.style.width = 100 + '%';
        elemHidden.value = 100;
        nextWidth = 100;
    }

    elemHidden.value = nextWidth;
    elem.style.width = nextWidth + '%';
    elem.innerHTML = nextWidth + '%';
}

function nextStep(elt) {

    $('.step').delay(500).slideUp(defaults.speed, defaults.easing);
    let step = elt.attr('data-action');
    $(step).slideToggle(defaults.speed, defaults.easing, function () { });
    progress();
}

function generatePIN(prefix) {

    let firstPart = Math.random().toString(36).toUpperCase().slice(-4);
    let secondPart = Math.random().toString(36).toUpperCase().slice(-4);

    return prefix + '-' + firstPart + '-' + secondPart;
}

const pin = generatePIN('PVSIM');

$(document).on({
    'focus': function (e) {
        $(this).removeClass('is-invalid');
    }
}, 'input');

$(document).on({
    'click': function (e) {
        let check = $('circle', this);
        check.css("fill", "var(--primary)");
        //$(this).fadeOut(300).fadeIn(200);
        $(this).addClass('animated flash');
        let dataform = $(this).attr('data-form');
        if (dataform !== undefined) {
            let data = dataform.split('|');
            if (data.length === 2) {
                if ($('.form--' + data[0]).length === 0) {
                    let input = document.createElement("input");
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', data[0]);
                    input.setAttribute('value', data[1]);
                    document.getElementById('step7').appendChild(input);
                }
                nextStep($(this));
            }
        }
    }
}, 'label');


const regexCp = /^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/gm;
$(document).on({
    'click': function (e) {
        e.preventDefault();
        if (!$('[name="zip"]').val().match(regexCp)) {
            $('[name="zip"]').addClass('is-invalid');
            return false;
        }
        nextStep($(this));

    }
}, '#step5 button');

$(document).on({
    'keyup': function (e) {

        if (e.which === 13) {
            if (!$('[name="zip"]').val().match(regexCp)) {
                $('[name="zip"]').addClass('is-invalid');
                return false;
            }
            nextStep($(this));

        }
    }
}, '#step5 input');

const regexName = /^[\- \'\’A-Za-zäëïöüÿáéíóúàèìòùâêîôûÄËÏÖÜŸÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛßç\.]{2,50}$/gm;
$(document).on({
    'click': function (e) {
        e.preventDefault();
        if (!$('[name="name"]').val().match(regexName)) {
            $('[name="name"]').addClass('is-invalid');
            return false;
        }
        if (!$('[name="prenom"]').val().match(regexName)) {
            $('[name="prenom"]').addClass('is-invalid');
            return false;
        }

        $('.step').delay(500).slideUp(defaults.speed, defaults.easing);
        $('.connexion').delay(500).slideToggle(defaults.speed, defaults.easing);



        setTimeout(function () {
            $('.etape_check_1').css('color', 'var(--success-dark)');
            $('.etape_check_1 > svg > path').css("fill", "var(--success-dark)");
        }, 1000)

        setTimeout(function () {
            $('.etape_check_2').css('color', 'var(--success-dark)');
            $('.etape_check_2 > svg > path').css("fill", "var(--success-dark)");
            document.getElementById("codep").innerHTML = getCodep();

        }, 2000)
        setTimeout(function () {
            $('.etape_check_3').css('color', 'var(--success-dark)');
            $('.etape_check_3 > svg > path').css("fill", "var(--success-dark)");
            document.getElementById("dossier").innerHTML = pin;

        }, 3000)

        setTimeout(function () {
            $('.etape_check_4').css('color', 'var(--success-dark)');
            $('.etape_check_4 > svg > path').css("fill", "var(--success-dark)");
        }, 4000)

        setTimeout(() => { nextStep($(this)) }, 5000);

    }
}, '#step6 button');

$(document).on({
    'keyup': function (e) {

        if (e.which === 13) {
            if (!$('[name="name"]').val().match(regexName)) {
                $('[name="name"]').addClass('is-invalid');
                return false;
            }
            if (!$('[name="prenom"]').val().match(regexName)) {
                $('[name="prenom"]').addClass('is-invalid');
                return false;
            }

            $('.step').delay(500).slideUp(defaults.speed, defaults.easing);
            $('.connexion').delay(500).slideToggle(defaults.speed, defaults.easing);

            setTimeout(function () {
                $('.etape_check_1').css('color', 'var(--success-dark)');
                $('.etape_check_1 > svg > path').css("fill", "var(--success-dark)");
            }, 1000)

            setTimeout(function () {
                $('.etape_check_2').css('color', 'var(--success-dark)');
                $('.etape_check_2 > svg > path').css("fill", "var(--success-dark)");
                document.getElementById("codep").innerHTML = getCodep();

            }, 2000)
            setTimeout(function () {
                $('.etape_check_3').css('color', 'var(--success-dark)');
                $('.etape_check_3 > svg > path').css("fill", "var(--success-dark)");
                document.getElementById("dossier").innerHTML = pin;

            }, 3000)

            setTimeout(function () {
                $('.etape_check_4').css('color', 'var(--success-dark)');
                $('.etape_check_4 > svg > path').css("fill", "var(--success-dark)");
            }, 4000)

            setTimeout(() => { nextStep($(this)) }, 5000);

        }
    }
}, '#step6 input');

const regexEmail = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
const regexPhone = /^0[6|7][0-9]{8}$/gm;
$(document).on({
    'submit': function (e) {
        e.preventDefault();
        if (!$('[name="email"]').val().match(regexEmail)) {
            $('[name="email"]').addClass('is-invalid');
            return false;
        }
        if (!$('[name="phone"]').val().match(regexPhone)) {
            $('[name="phone"]').addClass('is-invalid');
            return false;
        }

        $('#submit-btn').prop('disabled', true);
        $('#submit-btn span').removeClass('d-none');

        let formData = new FormData();
        $('input').each(function () {
            formData.append($(this).attr('name'), $(this).val());
        });
        formData.append('action', 'leads_send_form');

        var utm_source = getParam('utm_source');
        var utm_medium = getParam('utm_medium');
        var utm_term = getParam('utm_term');
        var utm_campaign = getParam('utm_campaign');
        var utm_site_domain = getParam('utm_site_domain');
        var utm_title = getParam('utm_title');
        var utm_cpc = getParam('utm_cpc');
        var gclid = getParam('gclid');
        var msclkid = getParam('msclkid');
        var tblci = getParam('tblci');

        $('input[name="lead_PIN"]').val(pin);

        $('input[name="leads-source"]').val(utm_source);
        $('input[name="leads-medium"]').val(utm_medium);
        $('input[name="leads-campaign"]').val(utm_campaign);
        $('input[name="leads-keyword"]').val(utm_term);
        $('input[name="utm_site_domain"]').val(utm_site_domain);
        $('input[name="utm_title"]').val(utm_title);
        $('input[name="utm_cpc"]').val(utm_cpc);
        $('input[name="gclid_field"]').val(gclid);
        $('input[name="msclkid_field"]').val(msclkid);
        $('input[name="tblci_field"]').val(tblci);


        let sqlDatetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
        $('[name="leads-date"]').val(sqlDatetime);

        $.ajax({
            url: 'https://pv.simulateur.org/wp-admin/admin-ajax.php',
            data: {
                action: 'leads_send_form',
                form: $('form').serialize()
            },
            type: 'POST',
            success: function (data) {
                if (data.code < 0) {
                    console.log(data.data);
                } else {
                    location.href = '/confirmation/';
                    console.log(data.code);
                }
            }
        });

    }
}, 'form');

(function () {
    if (navigator.userAgent.match(/bot|spider/i)) {
        //Request is a bot, do nothing
    } else {
        fetch('https://api.ipdata.co?api-key=32a64ffa339b881447d6c5b33f1e99c61baadf186a5cb35bc354b6da')
            .then(res => res.json())
            .then(data => {
                document.querySelector('input[name="lead_IP"]').value = data.ip
            }
            )
    }
})();

$(document).on("click", function (event) {
    // If the target is not the container or a child of the container, then process
    // the click event for outside of the container.
    if ($(event.target).closest(".choice, input, button").length === 0) {
        $('html, body').animate({
            scrollTop: $("main").offset().top
        }, 500);
        $("body").css("background-color", "#93ADCF");
        setTimeout(function () {
            $("body").css("background-color", "#f4f8fe");
            $(".choice").addClass("animated flash").delay(1000).queue(function () {
                $(this).removeClass("animated flash");
                $(this).dequeue();
            });
        }, 1000);
    }
});