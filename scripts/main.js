var str = "Hello. My name is Adrian Jablonski. I am a Web Developer and Software Engineer.";
//var str = "HELLO. MY NAME IS ADRIAN JABLONSKI. I AM A WEB DEVELOPER AND SOFTWARE ENGINEER";
var n = str.length;
var strArray = [];
var newStrArray;
var runInterval = true;
var countInterval = 0
j = 0
var colors = ["white", "skyblue", "green", "aqua", "indigo", "aquamarine", "yellow"]
var htmlTagStart = ["<p>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>", "<div>", "<li>", "<a>"]
var htmlTagEnd = ["</p>", "</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>", "</div>", "</li>","</a>"]

var date = new Date();
var currentYear = date.getFullYear();

var aboutMe = 0;

var blink = 0;
//var pixalateCount = 11;

$("#about-me-section2, #about-me-section3").hide();
//$(".previous-about-me").hide();

//var pixalate = function() {
//    $("#home").removeClass("homeImage" + pixalateCount)
//    pixalateCount -= 1;
//     if (pixalateCount <= 1) {
//        pixalateCount = 1
//        setInterval(typeLines, 200);
//    }
//    $("#home").addClass("homeImage" + pixalateCount);
//   
//}
//
//setInterval(pixalate, 400);

for (i = 0; i < n; i++) {
    strArray[i] = str[i];
}

var typeLines = function() { 
    
    if (runInterval === true) {
        
        if (j == 0) {
            newStrArray = strArray[j];
            j += 1;
        }
        else if (j >= n && j < n + 4){
            j += 1
        }
        else if (j == n + 4) {
            j = 0;
            newStrArray = []
            randNumb = Math.floor(Math.random() * colors.length)
            $("#text1").css("color", colors[randNumb]);
        }
        else {
            newStrArray += strArray[j];
            j += 1;
        };

        $("#text1").html(newStrArray);
        //$("#text").html(j);
        
        countInterval += 1;
        if (countInterval > n){
            runInterval = false;
            setInterval(insCursor, 700);
        }
        
    }
}

setInterval(typeLines, 100);

var bootStrapText = 0;

var insCursor = function() {
    if (blink === 0) {
        blink += 1;
        $("#text2").addClass("text2Hide")
    }
    else {
        blink = 0;
        $("#text2").removeClass("text2Hide");
    }
}


//setTimeout(setInterval(insCursor, 700),5000);

function skillSectionLogos(){
    var width = document.body.clientWidth;
    
//    if (width <= 765) {
//        $("#jquery-logo").removeClass("jquery-effect");
//    }
//    else {
    $("#jquery-logo").addClass("jquery-effect");
//    $(".jquery-effect").slideUp(1500);
    $(".jquery-effect").fadeIn(1500);
    $(".jquery-effect").fadeOut(1500);
//    $(".jquery-effect").slideDown(1500);
//    }
    
    randNumb = Math.floor(Math.random() * colors.length);
    $("#css-logo, .css-text").css("color", colors[randNumb]);
    
    randNumb = Math.floor(Math.random() * htmlTagStart.length);
    $(".html-line").text(htmlTagStart[randNumb] + "HTML" + htmlTagEnd[randNumb]);
    
    
    if (bootStrapText === 0) {
        $("#bootstrap-text").removeClass("bootstrap-text");
        bootStrapText += 1;
    }
    else if (bootStrapText === 1){
        $("#bootstrap-text").addClass("bootstrap-text");
        bootStrapText = 0;
    }
}

setInterval(skillSectionLogos, 1500);


$(".previous-about-me").click(function() {
    if (aboutMe === 1) {
        $("#about-me-section2").slideUp(1000);
        $("#about-me-section1").slideDown(1000);
        $(".about-me-heading-main").text("Education");
        $(".previous-about-me").addClass('hide-arrow');
        $("#about-me-education, #about-me-before-web-dev").addClass("active-about-me");
        $("#about-me-experience, #about-me-after-web-dev").removeClass("active-about-me");
        $("#about-me").removeClass("about-me-pic2");
        $("#about-me").addClass("about-me-pic1");
        aboutMe -= 1;
    }
    else if (aboutMe === 2) {
        $("#about-me-section3").slideUp(1000);
        $("#about-me-section2").slideDown(1000);
        $(".about-me-heading-main").text("Work Experience");
        $(".next-about-me").removeClass('hide-arrow');
        $("#about-me-experience, #about-me-before-web-dev").addClass("active-about-me");
        $("#about-me-software-dev, #about-me-after-web-dev").removeClass("active-about-me");
        $("#about-me").removeClass("about-me-pic3");
        $("#about-me").addClass("about-me-pic2");
        aboutMe -= 1;
    }
    
});

// Clicking on arrows
$(".next-about-me").click(function() {
    if (aboutMe === 0) {
        $("#about-me-section1").slideUp(1000);
        $("#about-me-section2").slideDown(1000);
        $(".about-me-heading-main").text("Work Experience");
        $(".previous-about-me").removeClass('hide-arrow');
        $("#about-me-education, #about-me-after-web-dev").removeClass("active-about-me");
        $("#about-me-experience, #about-me-before-web-dev").addClass("active-about-me");
        $("#about-me").removeClass("about-me-pic1");
        $("#about-me").addClass("about-me-pic2");
        aboutMe += 1;
    }
    else if (aboutMe === 1) {
        $("#about-me-section2").slideUp(1000);
        $("#about-me-section3").slideDown(1000);
        $(".about-me-heading-main").text("Coding Bootcamp");
        $(".next-about-me").addClass('hide-arrow');
        $("#about-me-experience, #about-me-before-web-dev").removeClass("active-about-me");
        $("#about-me-software-dev, #about-me-after-web-dev").addClass("active-about-me");
        $("#about-me").removeClass("about-me-pic2");
        $("#about-me").addClass("about-me-pic3");
        aboutMe += 1;
    }
    
});

//Clicking on about nav bar text
$("#about-me-education").click(function() {
    if (aboutMe != 0) {
        $("#about-me-section2, #about-me-section3").slideUp(1000);
        $("#about-me-section1").slideDown(1000);
        $(".about-me-heading-main").text("Education");
        $(".previous-about-me").addClass('hide-arrow');
        $(".next-about-me").removeClass('hide-arrow');
        $("#about-me-education, #about-me-before-web-dev").addClass("active-about-me");
        $("#about-me-experience, #about-me-software-dev, #about-me-after-web-dev").removeClass("active-about-me");
        $("#about-me").removeClass("about-me-pic2 about-me-pic3");
        $("#about-me").addClass("about-me-pic1");
        
        aboutMe = 0;
    }
});

$("#about-me-experience").click(function() {
    if (aboutMe != 1) {
        $("#about-me-section1, #about-me-section3").slideUp(1000);
        $("#about-me-section2").slideDown(1000);
        $(".about-me-heading-main").text("Work Experience");
        $(".previous-about-me").removeClass('hide-arrow');
        $(".next-about-me").removeClass('hide-arrow');
        $("#about-me-experience, #about-me-before-web-dev").addClass("active-about-me");
        $("#about-me-education, #about-me-software-dev, #about-me-after-web-dev").removeClass("active-about-me");
        $("#about-me").removeClass("about-me-pic1 about-me-pic3");
        $("#about-me").addClass("about-me-pic2");
        aboutMe = 1;
    }
});

$("#about-me-software-dev").click(function() {
    if (aboutMe != 2) {
        $("#about-me-section1, #about-me-section2").slideUp(1000);
        $("#about-me-section3").slideDown(1000);
        $(".about-me-heading-main").text("Coding Bootcamp");
        $(".previous-about-me").removeClass('hide-arrow');
        $(".next-about-me").addClass('hide-arrow');
        $("#about-me-software-dev, #about-me-after-web-dev").addClass("active-about-me");
        $("#about-me-education, #about-me-experience, #about-me-before-web-dev").removeClass("active-about-me");
        $("#about-me").removeClass("about-me-pic1 about-me-pic2");
        $("#about-me").addClass("about-me-pic3");
        aboutMe = 2;
    }
});

$("#copyright").text("\u00A9 " + currentYear + " JablonskiWebDevelopment");

//$(".jquery-text").click(function() {
//    $("#jquery-logo").toggle(10000);
//})
