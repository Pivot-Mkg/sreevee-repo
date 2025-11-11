// Read params and fill summary
const qp = new URLSearchParams(window.location.search);
const mapName = {
  one: 'Aluminum Foil Rolls (AL-FR)',
  two: 'Aluminum Foil Sheets (AL-FS)',
  three: 'Aluminum Cushion Foil (AL-CF)',
  four: 'Aluminum Foil Trays - Rectangular (AL-FT-RCT)',
  five: 'Aluminum Foil Trays - Round (AL-FT-RND)',
  six: 'Aluminum Tray Lids - Rectangular (AL-FT-RCT-LD)',
  custom: 'Custom Product Request'
};

const product = qp.get('product') || '';
const length = qp.get('length') || '';
const width = qp.get('width') || '';
const thickness = qp.get('thickness') || '';

// Populate minimal product-only field and hidden fields
const productNameEl = document.getElementById('productName');
const lengthEl = document.getElementById('length');
const widthEl = document.getElementById('width');
const thicknessEl = document.getElementById('thickness');

if (productNameEl) productNameEl.value = mapName[product] || 'Selected Product';
if (lengthEl) lengthEl.value = length;
if (widthEl) widthEl.value = width;
if (thicknessEl) thicknessEl.value = thickness;

function buildProductUrl() {
  const url = new URL('product.html', window.location.origin + window.location.pathname.replace(/[^/]*$/, ''));
  const p = product;
  if (p) url.searchParams.set('product', p);
  const l = length;
  const w = width;
  const t = thickness;
  if (l) url.searchParams.set('length', l);
  if (w) url.searchParams.set('width', w);
  if (t) url.searchParams.set('thickness', t);
  return url;
}

// Back links
const back = document.getElementById('backToProduct');
if (back) back.href = buildProductUrl().toString();
const back2 = document.getElementById('backToProduct2');
if (back2) back2.href = buildProductUrl().toString();

// Submit the form to PHP
document.getElementById('quoteForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Notification helper
  const ensureNoticeHost = () => {
    let host = document.getElementById('notices');
    if (!host) {
      host = document.createElement('div');
      host.id = 'notices';
      host.setAttribute('aria-live', 'polite');
      document.body.appendChild(host);
    }
    return host;
  };
  const notify = (message, type = 'success') => {
    const host = ensureNoticeHost();
    const el = document.createElement('div');
    el.className = `notice ${type}`;
    el.innerHTML = `
      <div class="d-flex align-items-start gap-2">
        <div class="flex-grow-1">${message}</div>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
    `;
    const btn = el.querySelector('button');
    btn?.addEventListener('click', () => el.remove());
    host.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  };

  // Basic validation for Customer Information
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const companyInput = document.getElementById('company');
  const clearInvalid = (el) => el && el.classList.remove('is-invalid');
  const setInvalid = (el) => el && el.classList.add('is-invalid');
  [nameInput, emailInput, companyInput].forEach(clearInvalid);

  const errors = [];
  const nameVal = nameInput?.value?.trim() || '';
  const emailVal = emailInput?.value?.trim() || '';
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  if (!nameVal) { setInvalid(nameInput); errors.push('Full Name'); }
  if (!emailOk) { setInvalid(emailInput); errors.push('Valid Email'); }

  if (errors.length) {
    notify('Please provide: ' + errors.join(', '), 'error');
    return;
  }
  const params = new URLSearchParams();
  params.set('productName', productNameEl?.value || '');
  params.set('length', lengthEl?.value || '');
  params.set('width', widthEl?.value || '');
  params.set('thickness', thicknessEl?.value || '');
  params.set('company', document.getElementById('company')?.value || '');
  params.set('name', document.getElementById('name')?.value || '');
  params.set('email', document.getElementById('email')?.value || '');
  params.set('phone', document.getElementById('phone')?.value || '');
  params.set('datasheet', document.querySelector('input[name="datasheet"]:checked')?.value || 'no');
  params.set('notes', document.getElementById('notes')?.value || '');
  params.set('customDetails', document.getElementById('customDetails')?.value || '');

  try {
    const res = await fetch('process-quote.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.success) {
      notify('Thanks! Your request has been sent successfully.', 'success');
      const formEl = e.target;
      if (formEl && typeof formEl.reset === 'function') { formEl.reset(); }
      if (productNameEl) productNameEl.value = mapName[product] || '';
      if (lengthEl) lengthEl.value = length;
      if (widthEl) widthEl.value = width;
      if (thicknessEl) thicknessEl.value = thickness;
    } else {
      notify((data && data.message) || 'Sorry, there was an error sending your request.', 'error');
    }
  } catch (err) {
    notify('Network error. Please try again later.', 'error');
  }
});
