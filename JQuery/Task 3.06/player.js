//REVIEW: BLOCKED: https://db.tt/WCez9Cev
$(function () {

	$.Player = function (list) {

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
	};

	// Test example
	var player = new $.Player(["../Audio/qwer.mp3", "../Audio/Kalimba.mp3"]);
	player.addSound("../Audio/Maid.mp3");

	$("#bPlay").click(function () {
		player.play();
	});
	$("#bPause").click(function () {
		player.pause();
	});
	$("#bPrevSound").click(function () {
		player.prev();
	});
	$("#bNextSound").click(function () {
		player.next();
	});
	$("#progress").change(function () {
		player.setTimeInPercent($(this).val());
	});
	$("#volume").change(function () {
		player.setVolume($(this).val());
	});
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