/* Saraaf Trade Toolkit - shared tool controls */
(function () {
  const $ = id => document.getElementById(id);

  function fieldSummary() {
    const rows = [];
    document.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.closest('.tool-feedback') || !el.id || el.type === 'button' || el.type === 'submit') return;
      const label = document.querySelector('label[for="' + el.id + '"]');
      const name = label ? label.textContent.trim() : el.id;
      const value = el.value;
      if (value !== '') rows.push(name + ': ' + value);
    });
    return rows.join('\n');
  }

  function resultSummary() {
    const results = [];
    document.querySelectorAll('.result-value, [data-share-result], #total-value, #ledger-total, #output-total-value, #output-target-price, #output-moisture-weight, #output-cbm-total').forEach(el => {
      const text = el.textContent.trim();
      if (text && !results.includes(text)) results.push(text);
    });
    return results.length ? '\n\nResults:\n' + results.join('\n') : '';
  }

  function makeShareText() {
    const title = document.querySelector('[data-tool-title]')?.textContent.trim() || document.title;
    return 'Saraaf Trade Toolkit — ' + title + '\n\n' + fieldSummary() + resultSummary() + '\n\nGenerated: ' + new Date().toLocaleString();
  }

  async function shareQuote() {
    const text = makeShareText();
    if (navigator.share) {
      try { await navigator.share({ title: document.title, text }); return; }
      catch (e) { if (e.name === 'AbortError') return; }
    }
    try {
      await navigator.clipboard.writeText(text);
      const btn = $('shareBtn');
      if (btn) { btn.textContent = 'Quote Copied!'; setTimeout(() => btn.textContent = 'Share Quote', 1600); }
    } catch (e) { window.prompt('Copy this quotation:', text); }
  }

  function addFeedback() {
    if ($('tool-feedback')) return;
    const box = document.createElement('section');
    box.id = 'tool-feedback';
    box.className = 'card tool-feedback';
    box.innerHTML = '<h2>Feedback</h2>' +
      '<p class="feedback-note">Rate this tool and tell us what would make it more useful for your trade workflow.</p>' +
      '<div class="feedback-row">' +
      '<div class="tool-stars" aria-label="Rate this tool">' +
      [1,2,3,4,5].map(n => '<button class="tool-star" type="button" data-star="' + n + '" aria-label="' + n + ' stars">★</button>').join('') +
      '</div>' +
      '<span id="feedback-rating" class="feedback-note"></span>' +
      '</div>' +
      '<textarea id="tool-feedback-text" placeholder="Optional comment"></textarea>' +
      '<button id="feedback-submit" class="btn-primary feedback-submit" type="button">Submit Feedback</button>' +
      '<p id="feedback-status" class="feedback-note"></p>';
    document.querySelector('.tool-main')?.appendChild(box);
    box.querySelectorAll('.tool-star').forEach(btn => btn.addEventListener('click', () => {
      const stars = Number(btn.dataset.star);
      box.querySelectorAll('.tool-star').forEach((s, i) => s.style.color = i < stars ? '#0480e4' : '#627885');
      $('feedback-rating').textContent = stars + ' / 5';
    }));
    $('feedback-submit')?.addEventListener('click', () => {
      const comment = $('tool-feedback-text')?.value.trim();
      if (!comment) { $('feedback-status').textContent = 'Please add a comment before submitting.'; return; }
      $('feedback-status').textContent = 'Thank you for your feedback. It has been noted for the toolkit review process.';
      $('tool-feedback-text').value = '';
    });
  }

  function init() {
    $('printBtn')?.addEventListener('click', () => window.print());
    $('shareBtn')?.addEventListener('click', shareQuote);
    addFeedback();
  }

  window.SaraafToolkit = { shareQuote, makeShareText };
  document.addEventListener('DOMContentLoaded', init);
})();
