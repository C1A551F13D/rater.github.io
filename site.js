const rateMovie = async (movieTitleElem, commentElem) => {
	const movieTitle = movieTitleElem.value;
	const comment = commentElem.value;

	if (movieTitle && comment) {
		const options = {
			method: 'POST',
			body: JSON.stringify({
				"data": [
					movieTitle,
					comment
				]
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const response = await fetch('https://unwelcomeimage-rater.hf.space/api/predict', options);
		const json = await response.json(); //extract JSON from the http response

		table = document.querySelector('#resultsTable > tbody');

		var json2 = JSON.parse(json.data).sort(function (a, b) {
			return a[0].localeCompare(b[0]);
		});

		table.innerHTML = '';
		json2.forEach(movie => {
			var row = table.insertRow();

			var title = row.insertCell(0);
			var rating = row.insertCell(1);

			title.innerText = movie[0];
			rating.innerText = movie[1];
		});
	}

	movieTitleElem.value = "";
	commentElem.value = "";
}