'use strict';


function formatQueryParams(params) {
	const queryItems = Object.keys(params)
		.map(key => `${key}=${params[key]}`)
	return queryItems;
}

function displayResults(responseJson) {

	console.log(responseJson);

	$('#results-list').empty();

  	for (let i = 0; i < responseJson.length; i++){
    	console.log('success');
    	$('#results-list').append(
      		`<li><h3><a href="${responseJson[i]['html_url']}">${responseJson[i]['name']}</a></h3>
			</li>`
		)};

	$('#results').removeClass('hidden');
};

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
				.then(responseJson => displayResults(responseJson))
				.catch(err => {
					$('#js-error-message').text(`Something went wrong: ${err.message}`);
				});
}

function watchForm() {
	$('form').submit(event => {
		event.preventDefault();
		const searchUser = $('#js-search-user').val();
		getNews(searchUser);
	});
}

$(watchForm)
console.log('app loaded');
