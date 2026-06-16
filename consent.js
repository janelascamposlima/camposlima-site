/* Campos Lima — consentimento de cookies (Google Consent Mode v2)
 * A tag de anúncios arranca "denied" por defeito (ver <head> de cada página).
 * Só passa a "granted" quando o utilizador carrega em Aceitar.
 * A escolha fica guardada no browser, por isso o aviso não volta a aparecer.
 * Sem dependências, sem build.
 */
(function () {
  var KEY = 'cl-consent';
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  function grant() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }

  if (saved === 'granted') { grant(); return; } // já aceitou numa visita anterior
  if (saved === 'denied') { return; }            // já recusou — fica negado, sem aviso

  function render() {
    document.documentElement.classList.add('cookie-active');

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<p class="cookie-text">Usamos cookies apenas para medir a eficácia dos nossos anúncios. ' +
      'Pode recusar — o site funciona exatamente na mesma.</p>' +
      '<div class="cookie-actions">' +
        '<button type="button" class="cookie-btn cookie-reject">Recusar</button>' +
        '<button type="button" class="cookie-btn cookie-accept">Aceitar</button>' +
      '</div>';
    document.body.appendChild(banner);

    function close() {
      banner.remove();
      document.documentElement.classList.remove('cookie-active');
    }

    banner.querySelector('.cookie-accept').addEventListener('click', function () {
      try { localStorage.setItem(KEY, 'granted'); } catch (e) {}
      grant();
      close();
    });
    banner.querySelector('.cookie-reject').addEventListener('click', function () {
      try { localStorage.setItem(KEY, 'denied'); } catch (e) {}
      close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
