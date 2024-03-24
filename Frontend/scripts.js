// frontend/scripts.js
document.getElementById('email-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const destination = formData.get('destination');
  const email = formData.get('email');

  try {
    const response = await fetch('http://localhost:2000/api/collect-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ destination, email })
    });

    if (response.ok) {
      // If the response status is 200, change the text on the frontend
      document.getElementById('status-message').innerText = `Mail sent to ${email}`;
    } else {
      // If the response status is not 200, handle the error
      console.error('Error:', response.statusText);
      // Handle other error cases if needed
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle network errors or other exceptions
  }
});
