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
      $(".chatwork-token-url").each(function(i){
        var link = $(this).attr('href');
        if(link.match(/.jpg|.png|.gif|.jpeg/)){
          console.log("画像URL発見")
//          console.log(link);
          $(this).after('<div><a href="' + link + '" target="_blank"><img class="stamp-img imagePreview" src="' + link + '" onerror="this.src=\'http://design-ec.com/d/e_others_50/l_e_others_501.png\';"></a></div>');
          console.log($(this));
          $(this).hide();
        }else{
          var thurl = encodeURIComponent(link);
          $.ajax({
            url: "https://n0v1poj6m0.execute-api.ap-northeast-1.amazonaws.com/test/thumbnailapi",
            dataType: 'json',
			type: 'GET',
			crossDomain: true,
			cache: false,
			success: function(data){
              $(".chatwork-token-url").eq(i).after('<div class="thumbnail-box"><div class="thumbnail-inner-box"><strong class="thumbnail-title">' + data.title + '</strong><p class="thumbnail-title">' + data.text + '</p></div><img class="thumbnail-img" src="http://design-ec.com/d/e_others_50/l_e_others_501.png"></div>');
//              console.log(data);
			},
			error: function(e){
              console.log("ERROR");
              console.log(e);
              
			}
		});
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
