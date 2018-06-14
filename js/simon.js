$(document).ready(function() {


	function greenLight(time) {
		$("#greenBtn").css({"background-color":"#00D900","duration":"1s"});
		var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
		audio.play();
		setTimeout(
			function(time) {
				$("#greenBtn").css({"background-color":"#008C00","duration":"1s"});
			}, time);		
	}


	function redLight(time) {
		$("#redBtn").css({"background-color":"#D90000","duration":"1s"});
		var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
		audio.play();		
		setTimeout(
			function(time) {
				$("#redBtn").css({"background-color":"#8C0000","duration":"1s"});
			}, time);
	};


	function yellowLight(time) {
		$("#yellowBtn").css({"background-color":"#D9D900","duration":"1s"});
		var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
		audio.play();		
		setTimeout(
			function(time) {
				$("#yellowBtn").css({"background-color":"#8C8C00","duration":"1s"});
			}, time);
	};


	function blueLight(time) {
		$("#blueBtn").css({"background-color":"#1E90FF","duration":"1s"});
		var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
		audio.play();		
		setTimeout(
			function(time) {
				$("#blueBtn").css({"background-color":"#0000B2","duration":"1s"});
			}, time);
	};	


	$("#greenBtn").click(function() {
		if (started == 0) {
			greenLight(300);
		}

	});

	$("#redBtn").click(function() {
		if (started == 0) {
			redLight(300);
		}
	});

	$("#yellowBtn").click(function() {
		if (started == 0) {
			yellowLight(300);
		}
	});

	$("#blueBtn").click(function() {
		if (started == 0) {
			blueLight(300);
		}		
	});


	$("#startButton").click(function() {
		$("#startButton").css("border", "5.5px solid grey")
		setTimeout(
			function() {
				$("#startButton").css("border", "2.5px solid grey")
			}, 135);
	});

	$("#strictButton").click(function() {
		$("#strictButton").css("border", "5.5px solid grey")
		setTimeout(
			function() {
				$("#strictButton").css("border", "2.5px solid grey")
			}, 135);
	});		




	var strictToggle = 0;
	var onOffToggle = 0;



	$("#strictButton").click(function() {
		if (onOffToggle == 0) {
			return;
		} else {
			if (strictToggle == 0) {
				strictToggle = 1;
				$("#strictInd").css("background-color", "red");			
			} else {
				strictToggle = 0;
				$("#strictInd").css("background-color", "#38120f");
			}	
		}
	});


	$("#onOffButton").click(function() {
		if (onOffToggle == 0) {
			onOffToggle = 1;
			$("#onOffButton").css("justify-content", "flex-end");
			$("#onPos").css("display", "inline");
			$("#offPos").css("display", "none");
			reset();
			$("#count").text("--");
		} else {
			onOffToggle = 0;
			$("#onOffButton").css("justify-content", "flex-start");
			$("#onPos").css("display", "inline");
			$("#offPos").css("display", "none");
			reset();
			$("#count").text("");			
		}				
	});



	function countdown() {
		setTimeout(function() {
			return true;
		},5000);
	};


	function reset() {
		challengeArr = [];
		responseArr = [];
		started = 0;
		round = 0;
		redo = 0;
		strictToggle = 0;
		$("#count").text("--");	
		$("#strictInd").css("background-color", "#38120f");
	};


	function random() {
		var number = 0;
		number = Math.floor(Math.random() * 4);
		return number;
	};

	var round = 0;
	var challengeArr = [];
	var responseArr = [];
	var speed;
	var started = 0;
	var loop;
	var redo = 0;


	function simon() {

		if (round > 19) {
			alert("You win!");
			return;
		} else {
			started = 1;
			round++;
			$("#count").text(round);

			if (round == 5) {
				speed = 600;
			} else if (round == 9) {
				speed = 500;
			} else if (round == 13) {
				speed = 400;
			} else {
				speed = 750;
			}; 

			if (redo == 0) {
				challengeArr.push(random());
			}

			var i = 0; 

			loop = setInterval(function(speed) {

				if (i < challengeArr.length) {

					if (challengeArr[i] == 0) {
						greenLight(300);
					} else if (challengeArr[i] == 1) {
						redLight(300);
					} else if (challengeArr[i] == 2) {
						yellowLight(300);
					} else if (challengeArr[i] == 3) {
						blueLight(300);
					} else {
						return;
					}
					i++;
				} else {
					clearInterval(loop);
					started = 0;
					redo = 0;
				}
			},speed);
		};

	};


	$(".button").click(function() {

		if (started == 1 || onOffToggle == 0 || round == 0) {
		} else {
			if ($(this).is("#greenBtn")) {
				responseArr.push(0);
			} else if ($(this).is("#redBtn")) {
				responseArr.push(1);
			} else if ($(this).is("#yellowBtn")) {
				responseArr.push(2);
			} else if ($(this).is("#blueBtn")) {
				responseArr.push(3);
			}
		};

		if (started == 1 || onOffToggle == 0 || round == 0) {
		} else if (challengeArr[responseArr.length-1] == responseArr[responseArr.length-1]) {
			if (challengeArr.length == responseArr.length) {
				responseArr = [];
				$("#count").text("👍");
				setTimeout(function() {simon()},1500);
			}
		} else {
			responseArr = [];
			if (strictToggle == 1) {
				$("#count").text("!!");
				reset();				
				setTimeout(function() {alert('YOU LOSE')},speed * .5);
			} else {
				$("#count").text("!!");	
				setTimeout(function() {simon()},1500);				
				setTimeout(function() {alert('WRONG')},speed * .5);
				redo = 1;
				round--;
			}
		}
	});



	$("#startButton").click(function() {
		if (onOffToggle == 0) {
		} else if (started == 1 || challengeArr.length != 0 || responseArr.length != 0) {				  
		} else {
			started = 1;
			simon(); 
		}
	});










});
