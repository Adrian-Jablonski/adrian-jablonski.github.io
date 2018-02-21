
var str = "JablonskiWebDevelopment.com is currently under construction";
var n = str.length;
var strArray = [];
var newStrArray;
j = 0
colors = ["red", "blue", "black", "orange", "green"]

for (i = 0; i < n; i++) {
    strArray[i] = str[i];
}

//$("#text").html("Page currently under construction")


setInterval(function(){
    
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
            
}, 200)