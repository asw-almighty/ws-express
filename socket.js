const WebSocket = require('ws');

module.exports = server => {
	const wss = new WebSocket.Server({ server });

	for (let i = 0; i < 255; i++) {
		const mac = `${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}:${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}:${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}${Math.floor(Math.random() * 16).toString(16)}:${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}:${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}:${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}${Math.floor(Math.random() * 16)
			.toString(16)
			.toUpperCase()}`;

		dummyData.data[mac] = {
			protocol: 200,
			summary: {
				AB: {
					AB: {
						AAA: {
							min: 80,
							max: 80,
							avg: 80,
						},
						AAB: {
							min: 20,
							max: 20,
							avg: 20,
						},
						AAC: {
							min: 254,
							max: 254,
							avg: 254,
						},
						AAD: [],
						AAE: [],
					},
					AA: {
						ABA: 0,
						ABH: [0],
						ABI: [11],
						ACB: null,
						ACC: null,
						ACF: 0,
						ACE: 0,
						ABF: [],
					},
					AC: {
						AAA: 0,
						AAB: 2,
						AAC: 0,
						AAD: 0,
						AAE: 0,
					},
				},
				AC: {
					AB: null,
				},
			},
			uuid: 'fc8fb09b-39bf-4e5a-9782-2c706e2f9e52',
		};
	}

	wss.on('connection', (ws, req) => {
		// 웹 소켓 연결 시
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log('새로운 클라이언트 접속', ip);
		ws.on('message', message => {
			// 클라이언트로부터 메시지 수신 시
			console.log('message', message);
		});
		ws.on('error', err => {
			// 에러 발생 시
			console.error('error!', err);
		});
		ws.on('close', () => {
			// 연결 종료 시
			console.log('클라이언트 접속 해제', ip);
			clearInterval(ws.interval);
		});

		ws.interval = setInterval(() => {
			if (ws.readyState === ws.OPEN) {
				ws.send(JSON.stringify(dummyData));
			}
		}, 1000);
	});
};

const dummyData = {
	type: 'summary',
	data: {
		'3D:83:3A:39:D9:BD': {
			protocol: 200,
			summary: {
				AB: {
					AB: {
						AAA: {
							min: 80,
							max: 80,
							avg: 80,
						},
						AAB: {
							min: 20,
							max: 20,
							avg: 20,
						},
						AAC: {
							min: 254,
							max: 254,
							avg: 254,
						},
						AAD: [],
						AAE: [],
					},
					AA: {
						ABA: 0,
						ABH: [0],
						ABI: [11],
						ACB: null,
						ACC: null,
						ACF: 0,
						ACE: 0,
						ABF: [],
					},
					AC: {
						AAA: 0,
						AAB: 2,
						AAC: 0,
						AAD: 0,
						AAE: 0,
					},
				},
				AC: {
					AB: null,
				},
			},
			uuid: 'fc8fb09b-39bf-4e5a-9782-2c706e2f9e52',
		},
	},
	uuid: 'fc8fb09b-39bf-4e5a-9782-2c706e2f9e52',
};

const changeTo16 = value => {
	return value.toString(16);
};
