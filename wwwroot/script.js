$(document).ready(function(){
    $("#but").click(function(){
        $.get("http://localhost:5030/api/user", function(data){
            alert("Data: " + data );
          });
    })
}
)