import { appParams } from '@/lib/app-params';

const trimTrailingSlash = (value = '') => value.replace(/\/+$/, '');

const baseURL = trimTrailingSlash(appParams.apiBaseUrl || '');

const getStoredToken = () => {
  if (typeof window === 'undefined') {
    return appParams.token || null;
  }
  return appParams.token || window.localStorage.getItem('base44_access_token') || window.localStorage.getItem('token');
};

const toQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((arrayValue) => searchParams.append(key, arrayValue));
      return;
    }
    searchParams.append(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

const normalizeResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error((isJson && payload?.message) || response.statusText || 'Request failed');
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  if (!isJson) {
    return payload;
  }

  return payload?.data ?? payload;
};

const request = async (path, { method = 'GET', query, body, headers = {} } = {}) => {
  const token = getStoredToken();
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const response = await fetch(`${baseURL}${path}${toQueryString(query)}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers
    },
    ...(body !== undefined ? { body: isFormData ? body : JSON.stringify(body) } : {})
  });

  return normalizeResponse(response);
};

const createEntityClient = (entityName) => ({
  list: (sort) => request(`/entities/${entityName}`, { query: { sort } }),
  filter: (filters = {}, sort) => request(`/entities/${entityName}`, { query: { ...filters, sort } }),
  create: (data) => request(`/entities/${entityName}`, { method: 'POST', body: data }),
  update: (id, data) => request(`/entities/${entityName}/${id}`, { method: 'PATCH', body: data })
});

const resolveRedirectUrl = (path, currentUrl) => {
  const encodedRedirect = currentUrl ? `?redirect=${encodeURIComponent(currentUrl)}` : '';
  return `${baseURL}${path}${encodedRedirect}`;
};

export const apiClient = {
  request,
  entities: new Proxy(
    {},
    {
      get: (_, entityName) => createEntityClient(entityName)
    }
  ),
  functions: {
    invoke: (name, payload = {}) => request(`/functions/${name}`, { method: 'POST', body: payload })
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return request('/integrations/core/upload-file', {
          method: 'POST',
          body: formData
        });
      }
    }
  },
  auth: {
    me: () => request('/auth/me'),
    logout: (redirectUrl) => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('base44_access_token');
        window.localStorage.removeItem('token');
        if (redirectUrl) {
          window.location.href = resolveRedirectUrl('/auth/logout', redirectUrl);
        }
      }
    },
    redirectToLogin: (redirectUrl) => {
      if (typeof window !== 'undefined') {
        window.location.href = resolveRedirectUrl('/auth/login', redirectUrl);
      }
    }
  },
  appLogs: {
    logUserInApp: (pageName) => request('/app-logs/user-in-app', {
      method: 'POST',
      body: { pageName }
    })
  }
};

export const base44 = apiClient;
