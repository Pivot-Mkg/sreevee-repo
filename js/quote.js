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
  params.set('height', heightEl?.value || '');
  params.set('sku', skuEl?.value || '');
  params.set('family', familyEl?.value || '');
  params.set('category', categoryEl?.value || '');
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
      if (productNameEl) productNameEl.value = productLabel || '';
      if (lengthEl) lengthEl.value = length;
      if (widthEl) widthEl.value = width;
      if (thicknessEl) thicknessEl.value = thickness;
      if (heightEl) heightEl.value = height;
    } else {
      notify((data && data.message) || 'Sorry, there was an error sending your request.', 'error');
    }
  } catch (err) {
    notify('Network error. Please try again later.', 'error');
  }
});
