import type { SupportedLanguage } from '@/config/appConfig';
import { getWidgetInstruction } from '@/i18n/instructions';

type PatchedXMLHttpRequest = XMLHttpRequest & {
  __futuristRequestInfo?: {
    url: string;
    method: string;
  };
};

const TARGET_PATH = '/api/message';

const state = {
  installed: false,
  instruction: '',
};

const normalizeInstruction = (value: string) => value.trim();

const shouldProcess = (url: string, method: string) => {
  if (!url || !method) {
    return false;
  }

  const normalizedMethod = method.toUpperCase();
  if (normalizedMethod === 'GET') {
    return false;
  }

  return url.includes(TARGET_PATH);
};

const applyInstruction = (payloadText: string) => {
  if (!state.instruction) {
    return null;
  }

  try {
    const data = payloadText ? JSON.parse(payloadText) : {};

    if (data && typeof data === 'object' && !data.instruction) {
      return JSON.stringify({
        ...data,
        instruction: state.instruction,
      });
    }
  } catch (error) {
    console.warn('[instruction-interceptor] Failed to parse JSON body', error);
  }

  return null;
};

const patchFetch = () => {
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
    return;
  }

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const request = input instanceof Request ? input : new Request(input, init);

      if (!shouldProcess(request.url, request.method)) {
        return originalFetch(input, init);
      }

      const cloned = request.clone();
      const bodyText = await cloned.text();
      const patchedBody = applyInstruction(bodyText);

      if (!patchedBody) {
        return originalFetch(input, init);
      }

      const headers = new Headers(cloned.headers);
      headers.set('content-type', 'application/json');

      const finalInit: RequestInit = {
        method: request.method,
        headers,
        body: patchedBody,
        cache: request.cache,
        credentials: request.credentials,
        integrity: request.integrity,
        keepalive: request.keepalive,
        mode: request.mode,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        signal: request.signal,
      };

      return originalFetch(request.url, finalInit);
    } catch (error) {
      console.warn('[instruction-interceptor] Fetch patch failed', error);
      return originalFetch(input, init);
    }
  };
};

const patchXMLHttpRequest = () => {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (
    method: string,
    url: string | URL,
    async?: boolean,
    username?: string | null,
    password?: string | null,
  ) {
    const requestUrl = typeof url === 'string' ? url : url.toString();

    (this as PatchedXMLHttpRequest).__futuristRequestInfo = {
      url: requestUrl,
      method: method ?? 'GET',
    };

    return originalOpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
  };

  XMLHttpRequest.prototype.send = function (...args: Parameters<typeof originalSend>) {
    const [body] = args;
    const requestInfo = (this as PatchedXMLHttpRequest).__futuristRequestInfo;

    if (requestInfo && typeof body === 'string' && shouldProcess(requestInfo.url, requestInfo.method)) {
      const patchedBody = applyInstruction(body);

      if (patchedBody) {
        return originalSend.call(this, patchedBody);
      }
    }

    return originalSend.apply(this, args);
  };
};

export const initInstructionInterceptor = (language: SupportedLanguage) => {
  state.instruction = normalizeInstruction(getWidgetInstruction(language));

  if (state.installed) {
    return;
  }

  patchFetch();
  patchXMLHttpRequest();

  state.installed = true;
};

export const updateInstructionLanguage = (language: SupportedLanguage) => {
  state.instruction = normalizeInstruction(getWidgetInstruction(language));
};

