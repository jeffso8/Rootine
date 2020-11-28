export async function getTest(){
    const data = await fetch("/users").then(res => {
		return res.json();
	})
	return data;
};

export async function getTracker(){
	const data = await fetch("/tracker").then(res => {
		return res.json();
	})
	console.log('getTracker', data);
	return data;
};


export async function getHabits(){
	const data = await fetch("/habits").then(res => {
		return res.json();
	})
	console.log('getHabits', data);
	return data;
};

// export async function getHabits(){
// 	console.log('getHabits 1');
// 	const data = await fetch("/api/habits", {
// 		method: 'GET',
//   	headers: {
// 			'Content-Type': 'application/json',
// 			'Accept': 'application/json'
// 		},
// 	}).then(res => {
// 		console.log("res.json", res.json());
// 		return res.json();
// 	}).then(data => {
// 		console.log('getHabits', data);
// 		return data
// 	});
// };

export async function getCompletions(){
	const data = await fetch("/completion").then(res => {
		return res.json();
	})
	console.log("ssss", data);

	return data;
};

export async function getHabitHistory(route){
	const data = await fetch(route).then(res => {
		console.log("getHabitHistoryRes", res);
		return res.json();
	})
	return data;
};

export async function postTracker(habit) {
	await fetch("/tracker", {
		method: 'POST',
  	headers: {
    'Content-Type': 'application/json',
  	},
  	body: JSON.stringify(habit),
	})
	.then(response => response.json())
	.then(data => {
		console.log('Success:', data);
	})
	.catch((error) => {
		console.error('Error:', error);
	})
};

export async function postHabitDays(args) {
	console.log('postHabitdays');
	await fetch("/habits", {
		method: 'POST',
  	headers: {
    'Content-Type': 'application/json',
  	},
  	body: JSON.stringify(args),
	})
	.then(response => response.json())
	.then(data => {
		console.log('Success:', data);
	})
	.catch((error) => {
		console.error('Error:', error);
	})
};
