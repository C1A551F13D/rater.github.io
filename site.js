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
		table = document.getElementById('resultsTable');
		var json2 = json.data.sort(function (a, b) {
			return a[0].localeCompare(b[0]);
		});
		json2.forEach(movie => {
			var row = table.insertRow();

			var title = row.insertCell(0);
			var rating = row.insertCell(1);

			title.innerHTML = movie[0];
			rating.innerHTML = movie[1];
		});
	}

	movieTitleElem.value = "";
	commentElem.value = "";
}