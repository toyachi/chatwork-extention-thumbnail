"use strict";
var checkDomChange = (function () {
  var observeTgt = document.getElementById("_timeLine");
  var observer = new MutationObserver(function (mrecords, mobserver) {
    var checkChange = function (x) {
      if (x.addedNodes &&
          x.addedNodes instanceof NodeList &&
          x.addedNodes.length > 0 &&
          x.type === 'childList') {
            return true;
          }
      return false;
    };
    if (mrecords.some(checkChange)) {
      console.log("DomChanged!!");
      $($(".chatwork-token-url").get().reverse()).each(function(){
        var link = $(this).attr('href');
        if(link.match(/.jpg|.png|.gif|.jpeg/)){
          console.log("画像発見")
          console.log(link);
          $(this).after('<div class="thumbnail-box"><a href="' + link + '" target="_blank"><img class="thumbnail-img imagePreview" src="' + link + '" onerror="this.src=\'http://design-ec.com/d/e_others_50/l_e_others_501.png\';"></a></div>');
          $(this).hide();
        }else{
          var thurl = encodeURIComponent(link);
//          $.ajax({
//            url: "",
//            dataType: 'json',
//			type: 'GET',
//			crossDomain: true,
//			cache: false,
//			success: function(data){
//              console.log(data);
//			},
//			error: function(e){
//		      console.log("ERROR")
//			}
//		});
        }
      });
	}
  });
  // 子要素のみを対象、孫要素以下は検知しない
  observer.observe(observeTgt, {childList: true, subtree: false});
});

$(function(){
  checkDomChange();
});
