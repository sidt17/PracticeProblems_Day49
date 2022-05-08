let XMLHttprequest=require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType,url,callback,async=true,data=null)
{
    return new Promise(function(resolve,reject){
        let xhr=new XMLHttprequest();
        xhr.onreadystatechange=function()
        {
            console.log("state change called. Ready State:"
            +xhr.readyState+"status "+xhr.status);
            if(xhr.status.toString().match('^[2][0,9]{2}$')){
                resolve(xhr.responseText);
            }else if(xhr.status.toString().match('^[4,5][0,9]{2}$')){
            reject({
                status:xhr.status,
                statusText:xhr.statusText
            });
            console.log("XHR failed");
            }
        }
        xhr.open(methodType,url,async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log(methodType +"request sent to the server");
    });
}
      
    const getURl="http://localhost:3000/employees/3";
    makePromiseCall("GET",getURl,true)
        .then(responseText => {
            console.log("Get User Data server" +responseText)
        })
        .catch(error => console.log("Get error status :" 
        +JSON.stringify(error)));
    
    const deleteURl="http://localhost:3000/employees/4";
    makePromiseCall("DELETE",deleteURl,false)
        .then(responseText => {
            console.log("user deleted:" +responseText)
        })
        .catch(error => console.log("Delete error status:" 
        + JSON.stringify(error)));
    
    const postURl="http://localhost:3000/employees/1";
    const emplData={"name": "Harry","Salary":"5000"};
    makePromiseCall("Post",postURl,true,emplData)
    .then(responseText => {
        console.log("user Added:" +responseText)
    })
    .catch(error => console.log("post error status:" 
    + JSON.stringify(error)));