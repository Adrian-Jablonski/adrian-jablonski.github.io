var urlStart = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+";
var location2 = "Houston";
var apiKey = "&key=AIzaSyDU-fy2Dvxy-7WUjmYF8PovXrwjz5qeFzs"; 
//var setHeader = 'Access-Control-Allow-Origin: *'

$.ajax({
    
    url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+houston&key=AIzaSyCXE2apPhQ6bm1FwxfyX-6HuMevRjTMmwQ",
    type: 'GET',
    crossDomain: true,
     dataType:"jsonp",
    success: function() { alert("Success"); },
    error: function(e) { console.log(e); alert('Failed!'); },
    //beforeSend: setHeader
});