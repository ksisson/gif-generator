var cars = ["ferrari", "lamborghini", "mclaren", "jeep", "mercedes-benz", "bmw"]


function makeButtons(){
for (var i = 0; i < cars.length; i++){
    var car_btn = $("<button>").text(cars[i]).attr("class", "carbutton btn btn-info")
    $("#topicbuttons").append(car_btn)
}}

$(".container").on("click", ".carbutton", function(){
    $("#gifdump").empty()
    var searchterm = $(this).text()
    console.log(searchterm)
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=vM7WfnHiEiI8wUINF70OPxLa9Le6f3zE&q=" + searchterm;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        for (var i = 0; i < 10; i++){
            var newdivgif = $("<div class='gifdiv'>")
            var newimggif = $("<img class='gif'>").attr({src: response.data[i].images.fixed_height.url, 
                state: "animated",
                animate: response.data[i].images.fixed_height.url,
                still: response.data[i].images.fixed_height_still.url
        })
            var newdivrating = $("<div>").text("Rating: " + response.data[i].rating)
            newdivgif.append(newimggif, newdivrating)
            $("#gifdump").prepend(newdivgif)
        }
    })
})

$(".container").on("click", ".gif", function(){
    var state = $(this).attr("state")
    if (state === "animated"){
        $(this).attr("src", $(this).attr("still"))
        $(this).attr("state", "still")
    }
    else{
        $(this).attr("src", $(this).attr("animate"))
        $(this).attr("state", "animated")
    }
})

$(".btn-dark").on("click", function(event){
    event.preventDefault();
    $("#topicbuttons").empty()
    if (cars.indexOf($("#car-input").val()) === -1 && $("#car-input").val() !== ""){
        cars.push($("#car-input").val())
    }
    
    makeButtons()

    
})
$(".reload").on("click", function(){
    location.reload();
})

makeButtons()

