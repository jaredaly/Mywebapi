$(document).ready(function(){
    $("#but").click(function(){
        $.get("http://localhost:5030/api/myapi", function(data){
            alert("Data: " + data );
          });
    })
}
)