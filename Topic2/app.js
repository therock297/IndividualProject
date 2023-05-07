const devices = JSON.parse(localStorage.getItem('devices')) || [];


// devices.forEach(function(device) {
//     const table = document.querySelector('#devices');
//     const row = document.createElement('tr');
  
//     const user = document.createElement('td');
//     const userText = document.createTextNode(device.user);
//     user.appendChild(userText);
  
//     const name = document.createElement('td');
//     const nameText = document.createTextNode(device.name);
//     name.appendChild(nameText);
  
//     row.appendChild(user);
//     row.appendChild(name);
  
//     table.appendChild(row);
//   });

  devices.forEach(function(device) {
    $('#devices tbody').append(`
      <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
      </tr>`
    );
  });

  $('#add-device').on('click', function() {
    const user = $('#user').val();
    const name = $('#name').val();
    devices.push({ user, name });
    console.log(devices);
    localStorage.setItem('devices', JSON.stringify(devices));
    location.href = 'device-list.html';
  });