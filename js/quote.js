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
if (document.getElementById('captchaQuestion')) {
  generateCaptcha();
  
  // Refresh captcha button
  document.getElementById('refreshCaptcha')?.addEventListener('click', generateCaptcha);
}

// Form validation
function validateQuoteForm(form) {
  const name = form.name.value.trim();
  const company = form.company.value.trim();
  const email = form.email.value.trim();
  const notes = form.notes.value.trim();
  const captcha = form.captcha?.value.trim() || '';
  
  // Reset validation states
  form.querySelectorAll('.form-control').forEach(input => {
    input.classList.remove('is-invalid');
  });
  
  let isValid = true;
  
  if (name.length < 2) {
    form.name.classList.add('is-invalid');
    isValid = false;
  }
  
  if (!company) {
    form.company.classList.add('is-invalid');
    isValid = false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'protonmail.com'];
  const emailDomain = email.split('@')[1]?.toLowerCase();
  
  if (!emailRegex.test(email) || personalDomains.includes(emailDomain)) {
    form.email.classList.add('is-invalid');
    isValid = false;
  }
  
  if (notes.length < 10) {
    form.notes.classList.add('is-invalid');
    isValid = false;
  }
  
  if (form.captcha && !captcha) {
    form.captcha.classList.add('is-invalid');
    isValid = false;
  }
  
  return isValid;
}

// Read params and fill summary
const qp = new URLSearchParams(window.location.search);
const mapName = {
  one: 'Aluminum Foil Rolls (AL-FR)',
  two: 'Aluminum Foil Sheets (AL-FS)',
  three: 'Aluminum Cushion Foil (AL-CF)',
  four: 'Aluminum Foil Trays - Rectangular (AL-FT-RCT)',
  five: 'Aluminum Foil Trays - Round (AL-FT-RND)',
  six: 'Aluminum Tray Lids - Rectangular (AL-FT-RCT-LD)',
  // Compostable categories
  cptc: 'Compostable Take-Out Containers (CP-TC)',
  cppt: 'Compostable Plates (CP-PT)',
  cpbl: 'Compostable Bowls (CP-BL)',
  ptld: 'PET Lids (PT-LD)',
  clmpn: 'Clamshell Punnets',
  clmhsp: 'Heat-seal Punnets',
  clmfp: 'Flowpacks',
  clmowt: 'Overwrap Trays',
  clmotg: 'On-the-go Packs',
  clmtec: 'Tamper-evident Clamshells',
  clmhc: 'Hinged Containers',
  custom: 'Custom Product Request'
};

const product = qp.get('product') || '';
const source = qp.get('source') || '';
const length = qp.get('length') || '';
const width = qp.get('width') || '';
const thickness = qp.get('thickness') || '';
const height = qp.get('height') || '';
const sku = qp.get('sku') || '';
const family = qp.get('family') || '';
const category = qp.get('category') || '';

// Populate minimal product-only field and hidden fields
const productNameEl = document.getElementById('productName');
const lengthEl = document.getElementById('length');
const widthEl = document.getElementById('width');
const thicknessEl = document.getElementById('thickness');
const heightEl = document.getElementById('height');
const skuEl = document.getElementById('sku');
const familyEl = document.getElementById('family');
const categoryEl = document.getElementById('category');

let productLabel = mapName[product] || mapName[source] || 'Selected Product';
const isClamSource =
  ['clmpn', 'clmhsp', 'clmfp', 'clmowt', 'clmotg', 'clmtec', 'clmhc'].includes(product) ||
  ['clmpn', 'clmhsp', 'clmfp', 'clmowt', 'clmotg', 'clmtec', 'clmhc'].includes(source);
if (product === 'custom' && (category === 'clamshell' || isClamSource)) {
  productLabel = 'Clamshell Containers (Custom)';
}
if (productNameEl) productNameEl.value = productLabel;
if (lengthEl) lengthEl.value = length;
if (widthEl) widthEl.value = width;
if (thicknessEl) thicknessEl.value = thickness;
if (heightEl) heightEl.value = height;
if (skuEl) skuEl.value = sku;
if (familyEl) familyEl.value = family;
if (categoryEl) categoryEl.value = category || source;

function buildProductUrl() {
  const url = new URL('product.html', window.location.origin + window.location.pathname.replace(/[^/]*$/, ''));
  const p = product === 'custom' && source ? source : product;
  if (p) url.searchParams.set('product', p);
  const l = length;
  const w = width;
  const t = thickness || height;
  if (l) url.searchParams.set('length', l);
  if (w) url.searchParams.set('width', w);
  if (t) {
    const isClam =
      ['clmpn', 'clmhsp', 'clmfp', 'clmowt', 'clmotg', 'clmtec', 'clmhc'].includes(
        product
      ) ||
      ['clmpn', 'clmhsp', 'clmfp', 'clmowt', 'clmotg', 'clmtec', 'clmhc'].includes(
        source
      );
    const key = isClam ? 'height' : 'thickness';
    url.searchParams.set(key, t);
  }
  if (sku) url.searchParams.set('sku', sku);
  if (family) url.searchParams.set('family', family);
  if (category || source) url.searchParams.set('category', category || source);
  return url;
}

// Back links
const back = document.getElementById('backToProduct');
if (back) back.href = buildProductUrl().toString();
const back2 = document.getElementById('backToProduct2');
if (back2) back2.href = buildProductUrl().toString();

// Prefill quick selectors
const lenSelect = document.getElementById('qLen');
const widSelect = document.getElementById('qWid');
const thkSelect = document.getElementById('qThk');
const thkLabel = document.querySelector('label[for="qThk"]');

const ensureOption = (select, value) => {
  if (!select || !value) return;
  const exists = [...select.options].some((opt) => opt.value === value);
  if (!exists) {
    const opt = new Option(value, value, true, true);
    select.add(opt);
  } else {
    select.value = value;
  }
};

ensureOption(lenSelect, length);
ensureOption(widSelect, width);
const isClamQuick =
  ['clmpn', 'clmhsp', 'clmfp', 'clmowt', 'clmotg', 'clmtec', 'clmhc'].includes(product) ||
  ['clmpn', 'clmhsp', 'clmfp', 'clmowt', 'clmotg', 'clmtec', 'clmhc'].includes(source);
if (isClamQuick) {
  if (thkLabel) thkLabel.textContent = 'Height (in)';
  ensureOption(thkSelect, height);
} else {
  ensureOption(thkSelect, thickness);
}

// Submit the form to PHP
document.getElementById('quoteForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateQuoteForm(e.target)) {
    return;
  }

  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

  const formData = new FormData();
  formData.append('productName', productNameEl?.value || '');
  formData.append('company', document.getElementById('company')?.value || '');
  formData.append('name', document.getElementById('name')?.value || '');
  formData.append('email', document.getElementById('email')?.value || '');
  formData.append('phone', document.getElementById('phone')?.value || '');
  formData.append('datasheet', document.querySelector('input[name="datasheet"]:checked')?.value || 'no');
  formData.append('notes', document.getElementById('notes')?.value || '');
  formData.append('captcha', document.getElementById('captchaAnswer')?.value || '');

  try {
    const response = await fetch('process-quote.php', {
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
      // Restore product info after reset
      if (productNameEl) productNameEl.value = productLabel || '';
      if (lengthEl) lengthEl.value = length;
      if (widthEl) widthEl.value = width;
      if (thicknessEl) thicknessEl.value = thickness;
      if (heightEl) heightEl.value = height;
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
