// if you collapsed body of functions then looks is good
$(function () {

	$.Player = function (list, controls) {

		// this player
		var $this = this;

		// events
		this.beforePlay = null;
		this.trackChange = null;
		this.timeChange = null;

		// property
		this.sounds = [];
		this.current = 0;
		this.volume = 1;

		// methods
		this.play = function () {
			if (this.beforePlay) {
				this.beforePlay(this.sounds[this.current].src, this.getDuration());
			}
			this.sounds[this.current].volume = this.volume;
			this.sounds[this.current].play();
		}
		this.pause = function () {
			this.sounds[this.current].pause();
		}
		this.prev = function () {
			if (!this.sounds[this.current].ended) {
				this.sounds[this.current].pause();
				this.sounds[this.current].currentTime = 0;
			}

			if (this.current > 0) {
				this.current--;
			} else {
				this.current = this.sounds.length - 1;
			}

			if (this.trackChange) {
				this.trackChange(this.sounds[this.current].src, this.getDuration());
			}

			this.play();
		}
		this.next = function () {
			if (!this.sounds[this.current].ended) {
				this.sounds[this.current].pause();
				this.sounds[this.current].currentTime = 0;
			}

			if (this.current < (this.sounds.length - 1)) {
				this.current++;
			} else {
				this.current = 0;
			}

			if (this.trackChange) {
				this.trackChange(this.sounds[this.current].src, this.getDuration());
			}

			this.play();
		}
		this.getTime = function () {
			var sec = parseInt(this.sounds[this.current].currentTime % 60);
			var min = parseInt((this.sounds[this.current].currentTime / 60) % 60);
			return min + ":" + sec;
		}
		this.getTimeInPercent = function () {
			var percent = this.sounds[this.current].currentTime / this.sounds[this.current].duration * 100;
			return percent;
		}
		this.getDuration = function () {
			var sec = parseInt(this.sounds[this.current].duration % 60);
			var min = parseInt((this.sounds[this.current].duration / 60) % 60);
			return min + ":" + sec;
		}
		this.setTime = function (time) {
			this.pause();
			this.sounds[this.current].currentTime = time;
			this.play();
		}
		this.setTimeInPercent = function (percent) {
			this.pause();
			if (!percent) {
				this.sounds[this.current].currentTime = 0;
			} else {
				var onePercent = this.sounds[this.current].duration / 100;
				var time = onePercent * percent;
				this.sounds[this.current].currentTime = time;
			}
			this.play();
		}
		this.setVolume = function (vol) {
			this.volume = parseInt(vol) / 100;
			this.sounds[this.current].volume = this.volume;
		}
		this.addSound = function (name) {
			var audio = new Audio(name);
			audio.load();
			// ReSharper disable once Html.EventNotResolved
			audio.addEventListener("timeupdate", function () {
				var time = $this.getTime();
				var percent = $this.getTimeInPercent();
				$this.timeChange(time, percent);
			});
			this.sounds.push(audio);
		}

		// added sounds
		if (list) {
			if (typeof list === "string") {
				this.addSound(list);
			} else {
				try {
					for (var i = 0; i < list.length; i++) {
						this.addSound(list[i]);
					}
				} catch (e) {
				};
			}
		}

		// initialize events UI
		if (controls) {
			if (controls.play) {
				$(controls.play).click(function () {
					$this.play();
				});
			}
			if (controls.pause) {
				$(controls.pause).click(function () {
					$this.pause();
				});
			}
			if (controls.prev) {
				$(controls.prev).click(function () {
					$this.prev();
				});
			}
			if (controls.next) {
				$(controls.next).click(function () {
					$this.next();
				});
			}
			if (controls.progress) {
				$(controls.progress).click(function () {
					$this.setTimeInPercent($(this).val());
				});
			}
			if (controls.volume) {
				$(controls.volume).click(function () {
					$this.setVolume($(this).val());
				});
			}
		}
	};

	// Test example

	var controls = {
		play: "#bPlay",
		pause: "#bPause",
		prev: "#bPrevSound",
		next: "#bNextSound",
		progress: "#progress",
		volume: "#volume"
	}

	var player = new $.Player(["../Audio/qwer.mp3", "../Audio/Kalimba.mp3"], controls);
	player.addSound("../Audio/Maid.mp3");

	// events
	player.beforePlay = function (name, duration) {
		$("#soundName").text(name);
		$("#soundTimeEnd").text(duration);
	}
	player.timeChange = function (time, percent) {
		$("#soundTimeCurrent").text(time);
		$("#progress").val(Math.round(percent));
	}
});