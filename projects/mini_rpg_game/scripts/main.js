var str = "Hello. My name is Adrian Jablonski. I am a Web Developer and Software Engineer";
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
            $("#text").css("color", colors[randNumb]);
        }
        else {
            newStrArray += strArray[j];
            j += 1;
        };

        $("#text").html(newStrArray);
        //$("#text").html(j);
        
        countInterval += 1;
        if (countInterval > n){
            runInterval = false
        }
        
    }
}

setInterval(typeLines, 100);
var bootStrapText = 0;

var skillSectionLogos = function(){
    var width = document.body.clientWidth;
    
    if (width < 765) {
        $("#jquery-logo").removeClass("jquery-effect");
    }
    else {
        $("#jquery-logo").addClass("jquery-effect");
        $(".jquery-effect").slideUp(1500);
        $(".jquery-effect").fadeIn(1500);
        $(".jquery-effect").fadeOut(1500);
        $(".jquery-effect").slideDown(1500);
    }
    
    randNumb = Math.floor(Math.random() * colors.length);
    $("#css-logo, .css-text").css("color", colors[randNumb]);
    
    randNumb = Math.floor(Math.random() * htmlTagStart.length);
    $(".html-line").text(htmlTagStart[randNumb] + "HTML" + htmlTagEnd[randNumb]);
    
    
    
    if (bootStrapText === 0) {
        $("#bootstrap-text").removeClass("bootstrap-text");
        bootStrapText += 1;
    }
    else if (bootStrapText === 1 && width > 765){
        $("#bootstrap-text").addClass("bootstrap-text");
        bootStrapText = 0;
    }
}

setInterval(skillSectionLogos, 1000);


$("#copyright").text("\u00A9 " + currentYear + " JablonskiWebDevelopment");

//$(".jquery-text").click(function() {
//    $("#jquery-logo").toggle(10000);
//})
