export default function createHttpRequest(url, httpMethod, body) {
  const apiUrl = 'http://10.0.2.2:3333/api/1.0.0/';

  try {
    return fetch(`${apiUrl}${url}`, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.loginObject.token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ favourited: !this.state.favourited });
        } else if (response.status === 400) {
          throw new Error('Bad request');
        } else if (response.status === 401) {
          throw new Error('Unauthorised request');
        } else if (response.status === 403) {
          throw new Error('Forbidden request');
        } else if (response.status === 404) {
          throw new Error('Not found');
        } else {
          throw new Error('Server error');
        }
      });
  } catch (error) {
    console.error(error);
  }
  return '';
}
