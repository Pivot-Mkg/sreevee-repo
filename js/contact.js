let captchaAnswer = 0;

// Generate captcha
async function generateCaptcha() {
  try {
    const response = await fetch('generate-captcha.php');
    if (!response.ok) {
      throw new Error('Failed to fetch captcha');
    }
    const data = await response.json();
    const questionEl = document.getElementById('captchaQuestion');
    questionEl.classList.add('updating');
    questionEl.textContent = data.question;
    document.getElementById('captchaAnswer').value = '';
    setTimeout(() => questionEl.classList.remove('updating'), 400);
  } catch (error) {
    // Fallback: generate simple captcha client-side
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const questionEl = document.getElementById('captchaQuestion');
    questionEl.classList.add('updating');
    questionEl.textContent = `${num1} + ${num2} = ?`;
    document.getElementById('captchaAnswer').value = '';
    setTimeout(() => questionEl.classList.remove('updating'), 400);
    console.warn('Using client-side captcha fallback');
  }
}

// Initialize captcha on page load
generateCaptcha();

// Refresh captcha button
document.getElementById('refreshCaptcha').addEventListener('click', generateCaptcha);

// Form validation
function validateForm(form) {
  const name = form.cName.value.trim();
  const company = form.cCompany.value.trim();
  const email = form.cEmail.value.trim();
  const message = form.cMsg.value.trim();
  const captcha = form.captchaAnswer.value.trim();
  
  // Reset validation states
  form.querySelectorAll('.form-control').forEach(input => {
    input.classList.remove('is-invalid');
  });
  
  let isValid = true;
  
  if (name.length < 2) {
    form.cName.classList.add('is-invalid');
    isValid = false;
  }
  
  if (!company) {
    form.cCompany.classList.add('is-invalid');
    isValid = false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'protonmail.com'];
  const emailDomain = email.split('@')[1]?.toLowerCase();
  
  if (!emailRegex.test(email) || personalDomains.includes(emailDomain)) {
    form.cEmail.classList.add('is-invalid');
    isValid = false;
  }
  
  if (message.length < 10) {
    form.cMsg.classList.add('is-invalid');
    isValid = false;
  }
  
  if (!captcha) {
    form.captchaAnswer.classList.add('is-invalid');
    isValid = false;
  }
  
  return isValid;
}

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!validateForm(e.target)) {
    return;
  }
  
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  const formData = new FormData();
  formData.append('name', document.getElementById('cName').value);
  formData.append('company', document.getElementById('cCompany').value);
  formData.append('email', document.getElementById('cEmail').value);
  formData.append('phone', document.getElementById('cPhone').value);
  formData.append('message', document.getElementById('cMsg').value);
  formData.append('captcha', document.getElementById('captchaAnswer').value);
  
  try {
    const response = await fetch('send-contact.php', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Show success message
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-success alert-dismissible fade show';
      alertDiv.innerHTML = `
        <i class="fas fa-check-circle"></i> ${data.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      e.target.parentNode.insertBefore(alertDiv, e.target);
      
      e.target.reset();
      generateCaptcha();
    } else {
      // Show error message
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-danger alert-dismissible fade show';
      alertDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i> ${data.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      e.target.parentNode.insertBefore(alertDiv, e.target);
      
      if (data.message.includes('Security check')) {
        generateCaptcha();
      }
    }
  } catch (error) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
      <i class="fas fa-exclamation-triangle"></i> Network error. Please check your connection and try again.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    e.target.parentNode.insertBefore(alertDiv, e.target);
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
});
