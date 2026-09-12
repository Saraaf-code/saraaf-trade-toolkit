/* Saraaf Trade Toolkit - shared tool controls */
(function () {
  const $ = id => document.getElementById(id);
  const HIDDEN_KEY = 'saraaf_hidden_tools';
  /* Paste the deployed Google Apps Script / other endpoint here when ready. */
  const DATA_ENDPOINT = window.SARAAF_DATA_ENDPOINT || '';

  function toolId() {
    return document.body.dataset.toolId || location.pathname.split('/').filter(Boolean).pop() || 'unknown';
  }
  function fieldSummary() {
    const rows = [];
    document.querySelectorAll('input,select,textarea').forEach(el => {
      if (el.closest('.tool-feedback') || !el.id || ['button','submit'].includes(el.type)) return;
      const label = document.querySelector('label[for="' + el.id + '"]');
      const name = label ? label.textContent.trim() : el.id;
      if (el.value !== '') rows.push(name + ': ' + el.value);
    });
    return rows.join('\n');
  }
  function resultSummary() {
    const results = [];
    document.querySelectorAll('.result-value,[data-share-result],#total-value,#ledger-total,#output-total-value,#output-target-price,#output-moisture-weight,#output-cbm-total').forEach(el => {
      const text = el.textContent.trim();
      if (text && !results.includes(text)) results.push(text);
    });
    return results.length ? '\n\nResults:\n' + results.join('\n') : '';
  }
  function makeShareText() {
    const title = document.querySelector('[data-tool-title]')?.textContent.trim() || document.title;
    return 'Saraaf Trade Toolkit — ' + title + '\n\n' + fieldSummary() + resultSummary() + '\n\nGenerated: ' + new Date().toLocaleString();
  }
  function logUsage(eventType, extra = {}) {
    if (!DATA_ENDPOINT) return;
    const payload = { eventType, toolId: toolId(), toolTitle: document.querySelector('[data-tool-title]')?.textContent.trim() || document.title, fields: fieldSummary(), results: resultSummary(), at: new Date().toISOString(), ...extra };
    try { fetch(DATA_ENDPOINT, { method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify(payload), keepalive:true }).catch(() => {}); } catch (e) {}
  }
  async function shareQuote() {
    const text = makeShareText();
    logUsage('share', { quoteText:text });
    if (navigator.share) {
      try { await navigator.share({ title:document.title, text }); return; } catch (e) { if (e.name === 'AbortError') return; }
    }
    try {
      await navigator.clipboard.writeText(text);
      const btn = $('shareBtn');
      if (btn) { btn.textContent='Quote Copied!'; setTimeout(() => btn.textContent='Share Quote',1600); }
    } catch (e) { window.prompt('Copy this quotation:', text); }
  }
  function addFeedback() {
    if ($('tool-feedback')) return;
    const box = document.createElement('section');
    box.id='tool-feedback'; box.className='card tool-feedback';
    box.innerHTML='<h2>Feedback</h2><p class="feedback-note">Rate this tool and tell us what would make it more useful for your trade workflow.</p><div class="feedback-row"><div class="tool-stars" aria-label="Rate this tool">' + [1,2,3,4,5].map(n => '<button class="tool-star" type="button" data-star="'+n+'" aria-label="'+n+' stars">★</button>').join('') + '</div><span id="feedback-rating" class="feedback-note"></span></div><textarea id="tool-feedback-text" placeholder="Optional comment"></textarea><button id="feedback-submit" class="btn-primary feedback-submit" type="button">Submit Feedback</button><p id="feedback-status" class="feedback-note"></p>';
    const host = document.querySelector('.tool-main') || document.querySelector('.max-w-7xl');
    if (!host) return;
    host.appendChild(box);
    box.querySelectorAll('.tool-star').forEach(btn => btn.addEventListener('click', () => {
      const stars=Number(btn.dataset.star); box.querySelectorAll('.tool-star').forEach((s,i)=>s.style.color=i<stars?'#0480e4':'#627885'); $('feedback-rating').textContent=stars+' / 5'; box.dataset.rating=stars;
    }));
    $('feedback-submit')?.addEventListener('click', () => {
      const comment=$('tool-feedback-text')?.value.trim(); const rating=box.dataset.rating || '';
      if (!rating && !comment) { $('feedback-status').textContent='Please add a rating or comment before submitting.'; return; }
      logUsage('feedback',{rating,comment}); $('feedback-status').textContent='Thank you for your feedback.'; $('tool-feedback-text').value='';
    });
  }
  function addHideButton() {
    const actions=document.querySelector('.tool-actions');
    if (!actions || document.getElementById('hideToolBtn')) return;
    const btn=document.createElement('button'); btn.id='hideToolBtn'; btn.className='tool-action danger'; btn.type='button'; btn.textContent='Hide Tool';
    btn.addEventListener('click',()=>{
      const hidden=new Set(JSON.parse(localStorage.getItem(HIDDEN_KEY)||'[]')); hidden.add(toolId()); localStorage.setItem(HIDDEN_KEY,JSON.stringify([...hidden])); location.href='../';
    });
    actions.appendChild(btn);
  }
  function init() {
    $('printBtn')?.addEventListener('click',()=>{ logUsage('print_requested',{quoteText:makeShareText()}); window.print(); });
    $('shareBtn')?.addEventListener('click',shareQuote);
    addFeedback(); addHideButton();
  }
  window.SaraafToolkit={shareQuote,makeShareText,logUsage};
  document.addEventListener('DOMContentLoaded',init);
})();
