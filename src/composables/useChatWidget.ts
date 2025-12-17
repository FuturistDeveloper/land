type ChatWidgetElement = HTMLElement & {
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
};

const log = (...messages: unknown[]) => {
  if (typeof console === 'undefined') {
    return;
  }
  console.debug('[chat-widget]', ...messages);
};

const getWidget = (): ChatWidgetElement | null => {
  if (typeof document === 'undefined') return null;
  return document.querySelector<ChatWidgetElement>('chat-widget');
};

const triggerWidgetOpen = () => {
  const widget = getWidget();
  
  if (widget && typeof widget.open === 'function') {
    log('calling widget.open() direct method');
    widget.open();
    return true;
  }

  log('widget.open() method not available, dispatching global event');
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('chat-widget:open', { bubbles: true }));
    return true;
  }

  return false;
};

export const useChatWidget = () => {
  const open = () => {
    log('open() requested');

    // 1. Try immediately
    if (triggerWidgetOpen()) {
      return;
    }

    // 2. If customElements API is available, wait for definition then try again
    if (typeof customElements !== 'undefined' && typeof customElements.whenDefined === 'function') {
      customElements.whenDefined('chat-widget').then(() => {
        log('chat-widget defined, retrying open()');
        triggerWidgetOpen();
      });
    }
  };

  const close = () => {
    const widget = getWidget();
    if (widget && typeof widget.close === 'function') {
      widget.close();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chat-widget:close', { bubbles: true }));
    }
  };

  const toggle = () => {
    const widget = getWidget();
    if (widget && typeof widget.toggle === 'function') {
      widget.toggle();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chat-widget:toggle', { bubbles: true }));
    }
  };

  return { open, close, toggle };
};

export const openChatWidget = () => {
  const { open } = useChatWidget();
  open();
};
