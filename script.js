function display()
{
    alert("clicked")
}
$(document).ready(function(){
    let apiKey = 'AIzaSyA-u2owqZgHf00F1_cTkZmu0CNCKcE6kmU'
    alert("submitted")
    $("form").submit((e) => {

        e.preventDefault()
        let search = $("#search").val()
        videoSearch(apiKey,search,10)
    })
})

function videoSearch(apiKey,search,maxResults){
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,(data) => {
        console.log(data)
    })

}