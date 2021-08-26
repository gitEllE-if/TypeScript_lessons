export function renderBlock(elementId: string, html: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = html;
  }
}

export function renderToast(message?: { type: string, text: string },
  action?: { name: string, handler: () => void }): void {
  let messageText = ''

  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }

  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast()
    }
  }
}

export function insertBlock(elementId: string, html: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.insertAdjacentHTML('beforeend', html);
  }
}

export function removeBlockChilds(elementId: string): void {
  const element = document.getElementById(elementId);
  while (element && element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function removeBlock(elementId: string): void {
  removeBlockChilds(elementId);
  document.getElementById(elementId)?.remove();
}
