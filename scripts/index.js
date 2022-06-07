var interval = window.setInterval(siteLoop, 1);

function TxtType(element, toRotate, period) {
    this.toRotate = toRotate;
    this.el = element;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;

    this.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting)
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        else
            this.txt = fullTxt.substring(0, this.txt.length + 1);

        this.el.innerHTML = '<span>' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting)
            delta /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    }

    this.tick();
}

window.onload = function() {
    var elements = document.getElementsByClassName('typewriter');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};


function changeBrandName(name) {
    let brand = document.getElementById("brand-name");
    brand.innerHTML = name;
}


function isElementInViewport(el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function siteLoop() {
    let slide_elements = document.getElementsByClassName('slide-up-fade-in');

    for (let i = 0; i < slide_elements.length; i++) {
        if (isElementInViewport(slide_elements[i])) {
            slide_elements[i].style = `
                visibility: visible;
                animation: slide-up-fade-in ease 1s;
                animation-iteration-count: 1;
                transform-origin: 50% 50%;
                animation-fill-mode:forwards; /*when the spec is finished*/
                -webkit-animation: slide-up-fade-in ease 1s;
                -webkit-animation-iteration-count: 1;
                -webkit-transform-origin: 50% 50%;
                -webkit-animation-fill-mode:forwards; /*Chrome 16+, Safari 4+*/ 
                -moz-animation: slide-up-fade-in ease 1s;
                -moz-animation-iteration-count: 1;
                -moz-transform-origin: 50% 50%;
                -moz-animation-fill-mode:forwards; /*FF 5+*/
                -o-animation: slide-up-fade-in ease 1s;
                -o-animation-iteration-count: 1;
                -o-transform-origin: 50% 50%;
                -o-animation-fill-mode:forwards; /*Not implemented yet*/
                -ms-animation: slide-up-fade-in ease 1s;
                -ms-animation-iteration-count: 1;
                -ms-transform-origin: 50% 50%;
                -ms-animation-fill-mode:forwards; /*IE 10+*/

                opacity: 0;
                opacity: 1/9;
            `;
        }
    }
}

class FrequentlyAskedQuestion {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }

    generateHTML() {
        return `
        <div class="faq-container">
            <button class="faq collapsible" onclick="faqClick()">
                <span>
                    <img id="drop" class="collapsible" src="assets/images/drop.png" alt="logo" height="20">
                </span>
                <span class="faq-question">
                    ${this.question}
                </span>
            </button>
            <div class="faq-answer">
                ${this.answer}
            </div>
        </div>
        `
    }
}

var FAQ_list = [
        new FrequentlyAskedQuestion("Question one", `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,`),
        new FrequentlyAskedQuestion("Question two", `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,`),
        new FrequentlyAskedQuestion("Question three", `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,`)
    ];

function search() {
    let input = document.getElementById('search').value;
    let faq_container = document.getElementById('faq-cont');

    let newHTML = "";
    for (let faq of FAQ_list) {
        if (faq.question.toLowerCase().includes(input.toLowerCase()))
            newHTML += faq.generateHTML();
    }

    faq_container.innerHTML = newHTML;
}

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("#search").addEventListener("keyup", event => {
      search();
    });

    let faq_container = document.getElementById('faq-cont');
    let newHTML = "";
    for (let faq of FAQ_list) {
        newHTML += faq.generateHTML();
    }

    faq_container.innerHTML = newHTML;

    var coll = document.getElementsByClassName("collapsible");

    for (let faq_item of coll) {
        faq_item.addEventListener("click", function() {
            this.classList.toggle("active");

            let child = this.querySelector('#drop');
            child.classList.toggle("active");
            if (this.classList.contains("active"))
                child.style = 'transform: rotate(90deg);';
            else
                child.style = '';

            var content = this.nextElementSibling;
            if (content.style.maxHeight){
              content.style.maxHeight = null;
            } else {
              content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
});



function faqClick() {
    
}


