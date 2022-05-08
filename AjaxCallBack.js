let XMLHttprequest=require("xmlhttprequest").XMLHttpRequest;

function showTime (){
    const date = new Date();
    return date.getHours()+"Hrs: "+date.getMinutes()+"Mins: "+date.getSeconds()+"Secs";
    }
function MakeAJAXCall(methodType,url,callback,async=true,data=null)
{

    let xhr = new XMLHttprequest();
    xhr.onreadystatechange=function()
    {
        console.log(methodType+" State changed called. Ready State: " + xhr.readyState + "Status: "+xhr.status);
        if(xhr.readyState==4)
        {
            if(xhr.status==200|| xhr.status==201)
            {
                callback(xhr.responseText);
            }else if(xhr.status>=400)
            {
                console.log("Handle 400 client Error 0r 500 Server Error");
            }
        }
    }
    
    xhr.open(methodType,url,async);
    if(data)
    {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        console.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType+"Request send to the server");
}

const getURL="http://localhost:3000/employees/3";

function getUserDetails(data)
{
    console.log("Get user Data at :"+showTime()+ "data:"+data);
}
MakeAJAXCall("GET",getURL,getUserDetails,true);
console.log("Made GET AJAX CALL to server at :"+ showTime());








