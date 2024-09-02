export async function gql(query: string, variables = {}) {
	const res = await fetch('http://rest:3000/rpc/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query,
			variables
		})
	});

	const { data, errors } = await res.json();

	if (errors) {
		throw new Error(errors[0].message);
	}

	return data;
}
