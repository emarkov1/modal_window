function noop() {}
function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div');
  }
  const wrap = document.createElement('div');
  wrap.className = 'modal-footer';
  buttons.forEach((btn) => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.className = `btn btn-${btn.type || secondary}`;
    $btn.onclick = btn.handler || noop;
    wrap.appendChild($btn);
  });
  return wrap;
}
function _createModal(options) {
  const modal = document.createElement('div');
  modal.className = 'vmodal';
  modal.insertAdjacentHTML(
    'afterbegin',
    `      
    <div class="modal-overlay" data-close='true'>
      <div class="modal-window" style="width:${options.width || '600px'}">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'window'}</span>
          ${
            options.closable
              ? "<span class='modal-close' data-close='true'>&times;</span>"
              : ''
          }
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>`
  );
  const footer = _createModalFooter(options.footerButtons);
  modal.querySelector('.modal-body').insertAdjacentElement('afterend', footer);
  document.body.appendChild(modal);
  return modal;
}
$.modal = function (options) {
  const ANIMATION_SPEED = 400;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;
  const modal = {
    open() {
      if (destroyed) console.log('already destroyed');
      !closing && $modal.classList.add('open');
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(function () {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    },
    destroy() {},
  };

  const listener = (e) => {
    if (e.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listener);
  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    },
  });
};
