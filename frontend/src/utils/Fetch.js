export default async function customFetch(
  endpoint,
  option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
) {
  if (!option) {
    option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
  if (!option.method) {
    option.method = 'GET';
  }
  if (!option.headers) {
    const token = localStorage.getItem('token');
    option.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }
  if (!option.headers['Content-Type']) {
    option.headers['Content-Type'] = 'application/json';
  }
  if (!option.headers.Authorization) {
    const token = localStorage.getItem('token');
    option.headers.Authorization = `Bearer ${token}`;
  }

  let response = {
    data: {},
    status: '',
    error: false,
  };

  try {
    const url = 'https://hack-winners.onrender.com/api/v1' + endpoint;
    const request = await fetch(url, option);
    const data = await request.json();
    response = {
      error: request.status >= 400,
      status: request.status,
      data: data,
    };
  } catch (error) {
    console.error('Error:', error);
    response = {
      error: true,
      status: 500,
      data: { message: 'Internal Server Error' },
    };
  }
  return response;
}
