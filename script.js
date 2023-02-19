var apiKey = 'AIzaSyBJfSV_-GrIr5_m5yo4YPCOC9QEHQeH27E'

$(document).ready(function(){
    var video=''
    var videos =$("#videos")
    var search,maxResults=10
    
    $pagination =$("#pagination"),
    totalRecords=0,
    records=[],
    recPerPage=0,
    nexPageToken="",
    totalPages=0 

    
    $("#myForm").submit(function(e){
        e.preventDefault()
        search = $("#search").val()
        var url=`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&order=date&maxResults=${maxResults}&type=video&q=${search}`
       
        console.log("Inside pegination buttion submitted")

        $.ajax({
            mehod:'Get',
            url:url,
            
            beforeSend:function()
            {
                console.log(url)
                $('#btn').attr("disabled",true)


            },
            success:function(data){
                console.log("New flow for pegination",data,url)
                $('#btn').attr("disabled",false)
                displayVedios(data)
            } 
    
        })

    })
})

function displayVedios(data){

$("#results").empty()
recPerPage=data.pageInfo.resultsPerPage
nextPageToken=data.nextPageToken
totalRecords=data.pageInfo.totalResults
totalPages=Math.ceil(totalRecords/recPerPage)
console.log("Callingapply_pagination ")
apply_pagination()
$("#table").show()  
var videoData=""
    data.items.forEach(item =>{

        // console.log("item.snippet.title",item.snippet.title)
        // console.log("item.snippet.title",item.snippet.thumbnails.high.url)
        videoData =`
        <tr>
        <td>
        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
        ${item.snippet.title}
        </a>
        </td>

        <td>
            <img width="420" height ="315" src="${item.snippet.thumbnails.high.url}"/>
        </td>
        <td>
            <a href="https://www.youtube.com/channel/${item.snippet.channelId} target="_blank"">
            ${item.snippet.channelTitle }
            </a>
        </td>
        </tr>
        ` 
        $("#results").append(videoData)
    });
   
}
function apply_pagination(){
    console.log("in apply")
    $pagination.twbsPagination({
        totalPages:totalPages,
        visiblePages:6,
        onPageClick: function(event,page){
            console.log("onPageClick")
            displayRecordsIndex=Math.max(page-1,0)*recPerPage
            endRec=displayRecordsIndex+recPerPage
            displayRecords=records.slice(displayRecordsIndex,endRec)
            generateRecord(nextPageToken)
        }
    })
    
}
function generateRecord(nextPageToken){
    var search,maxResults=10  
    search = $("#search").val()
    console.log("nextPageToken",nextPageToken)
    const url2=`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&order=date&maxResults=${maxResults}&type=video&q=${search}&pageToken=${nextPageToken}`
       
        console.log("Inside pegination buttion submitted",url2)

        $.ajax({
            mehod:'Get',
            url:url2,
            
            beforeSend:function()
            {
                console.log(url2)
                
                $('#btn').attr("disabled",true)
            },
            success:function(data){
                console.log("New flow for pegination",data,url2)
                $('#btn').attr("disabled",false)
                displayVedios(data)

            } 
    
        })

}