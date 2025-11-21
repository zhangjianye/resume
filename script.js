document.addEventListener('DOMContentLoaded', function() {
  const btnZh = document.getElementById('btn-zh');
  const btnEn = document.getElementById('btn-en');

  // Get saved language preference or default to Chinese
  let currentLang = localStorage.getItem('resume-lang') || 'zh';

  function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('resume-lang', lang);

    // Update button states
    btnZh.classList.toggle('active', lang === 'zh');
    btnEn.classList.toggle('active', lang === 'en');

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // Update all elements with data-zh and data-en attributes
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Handle elements that only have one language attribute (for nested content)
    document.querySelectorAll('[data-zh]:not([data-en]), [data-en]:not([data-zh])').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.textContent = text;
      }
    });
  }

  // Event listeners
  btnZh.addEventListener('click', () => switchLanguage('zh'));
  btnEn.addEventListener('click', () => switchLanguage('en'));

  // Initialize with saved or default language
  switchLanguage(currentLang);
});
