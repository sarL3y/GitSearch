'use strict';


function formatQueryParams(params) {
	const queryItems = Object.keys(params)
		.map(key => `${key}=${params[key]}`)
	return queryItems;
}

function getNews(query) {
	const searchUser = query;
	const params = {
		'type': 'all',
	};
	const queryString = formatQueryParams(params);
	const url = 'https://api.github.com/users/' + searchUser + '/repos' + '?' + queryString;

	console.log(url);

	fetch(url)
		.then(response => {
			if (response.ok) {
				return response.json();
				}
				throw new Error(response.statusText);
				})
				.then(responseJson => console.log(responseJson))
				.catch(err => {
					$('#js-error-message').text(`Something went wrong: ${err.message}`);
				});
}

function watchForm() {
	$('form').submit(event => {
		event.preventDefault();
		const searchTerm = $('#js-search-term').val();
		getNews(searchTerm);
	});
}

$(watchForm)
console.log('app loaded');
