function getLast7Dates() {
	const today = new Date();
	const dates = [];

	for (let i = 0; i < 7; i++) {
	  const date = new Date(today);
	  date.setDate(today.getDate() - i);
	  dates.push(date.toISOString().split('T')[0]);
	}

	return dates;
  }

console.log(getLast7Dates());
console.log(new Date().toISOString().split('T')[0]);
