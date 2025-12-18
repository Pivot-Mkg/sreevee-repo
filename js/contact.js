document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = e.target.querySelector('button');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending...';
  
  const formData = new FormData();
  formData.append('name', document.getElementById('cName').value);
  formData.append('email', document.getElementById('cEmail').value);
  formData.append('message', document.getElementById('cMsg').value);
  
  try {
    const response = await fetch('send-contact.php', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Message sent successfully!');
      e.target.reset();
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    alert('Failed to send message. Please try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
});
