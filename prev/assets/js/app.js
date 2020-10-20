// var TIMEOUT = 6000;
 
// var interval = setInterval(handleNext, TIMEOUT);
 
// function handleNext() {
 
//   var $radios = $('input[class*=&quot;slide-radio&quot;]');
//   var $activeRadio = $('input[class*=&quot;slide-radio&quot;]:checked');
 
//   var currentIndex = $activeRadio.index();
//   var radiosLength = $radios.length;
 
//   $radios
//     .attr('checked', false);
 
//   if (currentIndex &gt;= radiosLength - 1) {
 
//     $radios
//       .first()
//       .attr('checked', true);
 
//   } else {
 
//     $activeRadio
//       .next('input[class*=&quot;slide-radio&quot;]')
//       .attr('checked', true);
 
//   }
// }


$(document).ready(function(){
// invoke the carousel
    $('#myCarousel').carousel({
      interval: false
    });

// scroll slides on mouse scroll 
$('#myCarousel').bind('mousewheel DOMMouseScroll', function(e){

        if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            $(this).carousel('prev');
            
        }
        else{
            $(this).carousel('next');
            
        }
    });

//scroll slides on swipe for touch enabled devices 

    $("#myCarousel").on("touchstart", function(event){
 
        var yClick = event.originalEvent.touches[0].pageY;
        $(this).one("touchmove", function(event){

        var yMove = event.originalEvent.touches[0].pageY;
        if( Math.floor(yClick - yMove) > 1 ){
            $(".carousel").carousel('next');
        }
        else if( Math.floor(yClick - yMove) < -1 ){
            $(".carousel").carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
    });
});
    
});