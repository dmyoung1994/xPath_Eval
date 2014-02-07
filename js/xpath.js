$(document).ready(function(){
	var eval;
	chrome.extension.onMessage.addListener(function(request, sender) {
		if(request.action == "getSource") {
			var src = request.source;

			$('.xPathEx').keyup(function(e){
				eval = $(this).val();
				if(e.which == 13) {
					$('#submit').click();
				}
				if(eval.length === 0) {
					$('#title').html("xPath Expression Evaluator");
				}
			});

			$('#clear').click(function(){
				$('.xPathReturn').val("");
				$('.xPathEx').val("");
				$('#title').html("xPath Expression Evaluator");
			});

			$('#submit').click(function(){
				try {
					$(src).xpath(eval);
				} catch(err) {
					$('#title').html("Expression not valid");
					return;
				}
				var results = $(src).xpath(eval);
				var JSONObject = {};
				var descriminent = eval.substring(eval.lastIndexOf("/") + 1);
				var numResults = "No results found";
				
				if(descriminent.indexOf("@") !== -1 || descriminent.indexOf("text()") !== -1){
					for(var i=0; i<results.size(); i++){
						JSONObject[i+1] = results[i]["nodeValue"];
						numResults = i + 1;
						if(numResults === 1){
							numResults += " Result found!";
						} else {
							numResults += " Results found!";
						}
					}
				} else {
					for(var i=0; i<results.size(); i++){
						JSONObject[i+1] = results[i]["outerHTML"].replace(/"/g, "'");
						numResults = i + 1;
						if(numResults === 1){
							numResults += " Result found!";
						} else {
							numResults += " Results found!";
						}
					}
				}

				$('#title').html(numResults);
				JSONObject = JSON.stringify(JSONObject);
				JSONObject = unescape(JSONObject);
				$(".xPathReturn").val(JSONObject);
			});
		}
	});
});