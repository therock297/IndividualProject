const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

test('test device array', async () => {
  const response = await axios.get(`${API_URL}/devices`);
  const data = response.data;
  expect(data[0].user).toEqual('as');
  console.log(data[0]);
});


test('test airsystem array', async () => {
    const response = await axios.get(`${API_URL}/airsystem`);
    const data = response.data;
    expect(data[0].user).toEqual('bob');
    console.log(data[0]);
  });

  test('test security array', async () => {
    const response = await axios.get(`${API_URL}/securitysystem`);
    const data = response.data;
    expect(data[1].user).toEqual('alex');
    console.log(data[1]);
  });



  afterAll(() => {
    console.log('All tests passed!');
  });
// 