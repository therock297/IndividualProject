const API_URL = 'http://localhost:5000/api';

// Fetch and render device data
function renderDevices() {
  $.get(`${API_URL}/devices2`)
    .then(response => {
      $('#devices2 tbody').empty();
      response.forEach(device => {
        $('#devices2 tbody').append(`
          <tr>
            <td>${device.user}</td>
            <td>${device.name}</td>
            <td><button class="delete-btn" data-id="${device._id}" data-name="${device.name}">Delete</button></td>
          </tr>
        `);
      });
    })
    .catch(error => {
      console.error(`Failed to fetch device data: ${error}`);
    });
}


// Add device
$('#add-device').on('click', () => {
  const name = $('#name').val();
  const user = $('#user').val();
  
  // Check if user and name fields are empty
  if (!user || !name) {
    alert('Please fill in the form before adding a device.');
    return;
  }

  // Check if user and name fields contain only string values
  if (!isNaN(user) || !isNaN(name)) {
    alert('Please enter only string values for the user and name fields.');
    return;
  }

  const body = {
    name,
    user,
    sensorData: []
  };

  $.post(`${API_URL}/devices2`, body)
    .then(response => {
      console.log('eqqqqqqqq');
      window.location.replace('http://localhost:3000/madhav2') ;
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
    window.location.replace('http://localhost:3000/madhav2') ;
});

// Reset data
$('#reset-data').on('click', function () {
  localStorage.clear();
  location.href = '';
});

// Delete device
// async function deleteDevice(idToDelete) {
//   try {
//     const response = await fetch(`${API_URL}/${idToDelete}`, {
//       method: 'DELETE'
//     });
//     if (response.ok) {
//       console.log(`Data with ID ${idToDelete} has been deleted.`);
//     } else {
//       console.error(`Failed to delete data with ID ${idToDelete}.`);
//     }
//   } catch (error) {
//     console.error(`Failed to delete data with ID ${idToDelete}: ${error}`);
//   }
// }

async function deleteDevice(idToDelete) {
  try {
    // Delete device from MongoDB
    const response = await fetch(`${API_URL}/devices2/${idToDelete}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      console.error(`Failed to delete device with ID ${idToDelete}.`);
      return;
    }

    // Remove the corresponding row from the table
    $(`button[data-id='${idToDelete}']`).closest('tr').remove();
    console.log(`Device with ID ${idToDelete} has been deleted.`);
  } catch (error) {
    console.error(`Failed to delete device with ID ${idToDelete}: ${error}`);
  }
}


// Event listener for delete button
// Event listener for delete button
$('#devices2 tbody').on('click', '.delete-btn', function () {
  const id = $(this).data('id');
  const name = $(this).data('name');
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    deleteDevice(id);
  }
});


// Initial render of devices
renderDevices();
