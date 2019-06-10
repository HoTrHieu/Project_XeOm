$("#iconBar").click(function(){
    $("#menuSub").addClass("show");
    $(".wrapper").addClass("fixed");
})
$(".close").click(function(){
    $("#menuSub").removeClass("show");
    $(".wrapper").removeClass("fixed");
})

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
  });