class SetNewInterval {
	constructor (obj = {
		func: () => {},
		time: 0,
		autoStart: false,
		jumpFirst: true
	}) {
		this.func = obj.func;
		this.time = obj.time;
		this.autoStart = obj.autoStart;
		this.jumpFirst = obj.jumpFirst;
		this.timer = null;
		if (this.autoStart) {
			this.start();
		}
	}

	start () {
		if (!this.jumpFirst) {
			this.func();
		}
		let timeFunc = () => {
			return setTimeout(() => {
				this.func();
				this.timer = timeFunc();
			}, this.time);
		}
		this.timer = timeFunc ();
	}

	stop () {
		clearTimeout(this.timer);
		this.timer = null;
	}
}

/**
 * test
 */
let timeInter = new SetNewInterval({
	func: () => {
		console.log('123');
	},
	time: 1000,
	autoStart: true,
	jumpFirst: false
});