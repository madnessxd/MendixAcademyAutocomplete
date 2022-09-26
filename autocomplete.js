var prevUrl = document.URL;


function checkForUrlChanges(){
	if(document.URL != prevUrl){
		prevUrl = document.URL;
		startAutocomplete();
	}
	setTimeout(function() {
		checkForUrlChanges();
	}, 1000)
}

function startAutocomplete(){
	console.log("Start Autocomplete");
	if(document.URL.includes("/link/modules/")){	
		var quizIndex = 0;
		function doAcademy(){
			document.querySelector(".pds-c-button--primary")?.click();
			if(document.querySelector(".t-learn-fe-lecture-next")){
				document.querySelector(".t-learn-fe-lecture-next")?.click();
				setTimeout(doAcademy, 1000);
			} else {
				var questionList = [];
				if(document.querySelector(".mps-lecture__content")?.innerHTML.indexOf("Question 1:") > -1){
					// Knowledge Check
					doKnowledgeCheck();
				}
			}
		}

		function doKnowledgeCheck(){
			questionList = [];
			setTimeout(function() {
				selectAll(0);
			}, 1000)
		}

		function selectAll(index){
			for(var x = 0; x < document.querySelectorAll("LI").length; x++){
				if(document.querySelectorAll("LI")[x].innerHTML.indexOf("Question ") > -1){
					console.log(document.querySelectorAll("LI")[x].innerHTML.substr(document.querySelectorAll("LI")[x].innerHTML.indexOf("Question ") + 9, 1));
					console.log(questionList[parseFloat(document.querySelectorAll("LI")[x].innerHTML.substr(document.querySelectorAll("LI")[x].innerHTML.indexOf("Question ") + 9, 1)) - 1]);
					if(!questionList[parseFloat(document.querySelectorAll("LI")[x].innerHTML.substr(document.querySelectorAll("LI")[x].innerHTML.indexOf("Question ") + 9, 1)) - 1]){
						document.querySelectorAll("LI")[x].children[0].children[0].children[0].children[2].children[0].children[index].children[0].children[0].children[0].children[0].click();
					}
				}
			}
			setTimeout(function() {
				document.querySelector(".t-learn-fe-lecture-quiz-submit")?.click();		
				setTimeout(function() {
					checkAnswers();
				}, 1000);
			}, 1000);
		}

		function checkAnswers(){
			for(var x = 0; x < document.querySelectorAll(".mx-dataview-content").length; x++){
				if((document.querySelectorAll(".mx-dataview-content")[x].innerHTML.match(/Question/g) || []).length == 1){
					if(document.querySelectorAll(".mx-dataview-content")[x].innerHTML.indexOf("check.svg") > -1){
						questionList[document.querySelectorAll(".mx-dataview-content")[x].innerHTML.substr(document.querySelectorAll(".mx-dataview-content")[x].innerHTML.indexOf("Question ") + 9, 1) - 1] = true;
					}
				}
			}
			setTimeout(function() {
				if(quizIndex < 3){
					document.querySelector(".t-learn-fe-lecture-quiz-retake")?.click();
					setTimeout(function() {
						quizIndex++;
						selectAll(quizIndex);
					}, 1000);
				} else {
					quizIndex = 0;
					doAcademy();
				}
			}, 1000);
		}
		setTimeout(doAcademy, 1000);
	}
}
checkForUrlChanges();