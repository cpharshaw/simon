$(document).ready(() => {

	const simonGame = {
		onOffToggle: false,
		strictToggle: false,
		round: 0,
		challengeArr: [],
		responseArr: [],
		"speed": 750,
		started: false,
		loop: null,
		redo: 0,
		lives: 2,
		random() {
			const random = Math.floor(Math.random() * 4);
			return random;
		},
		colorButtonPressAppearance: function (button, time, playerPressed) {
			if (this.onOffToggle && (this.started || playerPressed)) {
				$('#' + button.id).css({ "background-color": button.activeStyle, "duration": "1s" });
				const audio = new Audio(button.activeSound);
				audio.play();
				setTimeout(() => $('#' + button.id).css({ "background-color": button.baseStyle, "duration": "1s" }), time);
			}
		},
		colorButtonPressLogic(buttonID, playerPressed) {

			const getButton = () => {
				if (buttonID === "redBtn") {
					return this.buttons.red;
				}
				if (buttonID === "blueBtn") {
					return this.buttons.blue;
				}
				if (buttonID === "yellowBtn") {
					return this.buttons.yellow;
				}
				if (buttonID === "greenBtn") {
					return this.buttons.green;
				}
			};

			const button = getButton();
			const time = 250;

			this.colorButtonPressAppearance(button, time, playerPressed);

			if (this.started == true || this.onOffToggle == false || this.round == 0) {
			} else {
				this.responseArr.push(button.num);
			};

			if (this.started == true || this.onOffToggle == false || this.round == 0) {
			} else if (this.challengeArr[this.responseArr.length - 1] == this.responseArr[this.responseArr.length - 1]) {
				if (this.challengeArr.length == this.responseArr.length) {
					this.responseArr = [];
					$("#count").text("👍");
					setTimeout((self => self.game())(this), 1500);
				}
			} else {
				this.responseArr = [];
				if (this.strictToggle == true || this.lives == 0) {
					$("#count").text("!!");
					this.reset();
					setTimeout(() => alert('YOU LOSE'), this.speed * .5);
				} else {
					$("#count").text("!!");
					setTimeout(() => this.game(), 1500);
					setTimeout(() => alert('WRONG - ' + (this.lives + 1) + " lives left..."), this.speed * .5);
					this.redo = 1;
					this.round--;
					this.lives--;
				}
			}
		},
		buttons: {
			red: {
				id: "redBtn",
				baseStyle: "#8C0000",
				activeStyle: "#D90000",
				activeSound: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
				num: 0
			},
			blue: {
				id: "blueBtn",
				baseStyle: "#0000B2",
				activeStyle: "#1E90FF",
				activeSound: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
				num: 1
			},
			yellow: {
				id: "yellowBtn",
				baseStyle: "#8C8C00",
				activeStyle: "#D9D900",
				activeSound: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
				num: 2
			},
			green: {
				id: "greenBtn",
				baseStyle: "#008C00",
				activeStyle: "#00D900",
				activeSound: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
				num: 3
			},
		},
		startButtonPress() {
			if (this.onOffToggle && !this.started) {
				$("#startButton").css("border", "5.5px solid grey");
				setTimeout(() => $("#startButton").css("border", "2.5px solid grey"), 135);
				this.started = true;
				this.game();
			}
		},
		strictButtonPress() {
			const toggleStrict = () => {
				$("#strictButton").css("border", "5.5px solid grey");
				setTimeout(() => $("#strictButton").css("border", "2.5px solid grey"), 135);
			}
			if (this.onOffToggle) {
				if (this.strictToggle) {
					toggleStrict();
					$("#strictInd").css("background-color", "#38120f");
					this.strictToggle = false;
				} else {
					toggleStrict();
					$("#strictInd").css("background-color", "red");
					this.strictToggle = true;
				}
			}
		},
		reset() {
			this.strictToggle = false;
			this.round = 0;
			this.challengeArr = [];
			this.responseArr = [];
			this.speed = null;
			this.started = false;
			this.loop = null;
			this.redo = 0;
			this.lives = 2;
			$("#count").text("--");
			$("#strictInd").css("background-color", "#38120f");
		},
		onOffButtonPress() {
			if (!this.onOffToggle) {
				this.onOffToggle = true;
				$("#onOffButton").css("justify-content", "flex-end");
				$("#onPos").css("display", "inline");
				$("#offPos").css("display", "none");
				this.reset();
				$("#count").text("--");
			} else {
				this.onOffToggle = false;
				$("#onOffButton").css("justify-content", "flex-start");
				$("#onPos").css("display", "inline");
				$("#offPos").css("display", "none");
				this.reset();
				$("#count").text("");
			}
		},
		playChallengeArr() {
			let i = 0;
			const loop = setInterval(
				() => {
					if (i < this.challengeArr.length) {
						if (this.challengeArr[i] == 0) {
							this.colorButtonPressAppearance(this.buttons.red, 300, false);
						} else if (this.challengeArr[i] == 1) {
							this.colorButtonPressAppearance(this.buttons.blue, 300, false);
						} else if (this.challengeArr[i] == 2) {
							this.colorButtonPressAppearance(this.buttons.yellow, 300, false);
						} else if (this.challengeArr[i] == 3) {
							this.colorButtonPressAppearance(this.buttons.green, 300, false);
						}
						i++;
					} else {
						clearInterval(loop);
						this.started = false;
						this.redo = 0;
					}
				},
				this.speed
			);
		},
		game() {
			if (this.round > 19) alert("Congratulations!  You win!  Now take a hike.");
			this.started = true;
			this.round++;

			$("#count").text(this.round);

			if (this.round == 5) {
				this.speed = 600;
			} else if (this.round == 9) {
				this.speed = 500;
			} else if (this.round == 13) {
				this.speed = 400;
			} else {
				this.speed = 750;
			};

			if (this.redo == 0) {
				this.challengeArr.push(this.random());
			};

			this.playChallengeArr();

		}

	}


	$(".button").on("click", function () {
		const val = $(this).data("val");
		simonGame.colorButtonPressLogic(val, true);
	});

	$("#startButton").on("click", function () {
		return simonGame.startButtonPress();
	});

	$("#strictButton").on("click", function () {
		return simonGame.strictButtonPress();
	});

	$("#onOffButton").on("click", function () {
		return simonGame.onOffButtonPress();
	});

});
