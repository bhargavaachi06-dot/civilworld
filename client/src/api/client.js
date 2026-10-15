/**
 * CivilWorld Centralized API Client
 * Manages standard JSON requests, HttpOnly cookie credentials, and token fallbacks.
 */

const API_BASE = '/api';

// Token stored in-memory (never in long-lived localStorage)
let inMemoryToken = null;

export const setAuthToken = (token) => {
  inMemoryToken = token;
};

export const getAuthToken = () => inMemoryToken;

export const clearAuthToken = () => {
  inMemoryToken = null;
};

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (inMemoryToken) {
    headers['Authorization'] = `Bearer ${inMemoryToken}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // Includes HttpOnly session cookie
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const error = new Error(data.message || `Request failed with status ${res.status}`);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export const authApi = {
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  logout: () =>
    request('/auth/logout', {
      method: 'POST',
    }),
  getMe: () => request('/auth/me'),
};

export const adminApi = {
  getOverview: () => request('/admin/overview'),
  getAuditLogs: (page = 1, limit = 20) =>
    request(`/admin/audit-logs?page=${page}&limit=${limit}`),
  getEnquiries: (page = 1, limit = 20) =>
    request(`/admin/enquiries?page=${page}&limit=${limit}`),
  updateEnquiryStatus: (id, status) =>
    request(`/admin/enquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  getModuleInfo: (moduleName) => request(`/admin/modules/${moduleName}`),
};

export const publicApi = {
  submitEnquiry: (formData) =>
    request('/public/enquiry', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
  getStats: () => request('/public/stats'),
  getHealth: () => request('/health'),
};
