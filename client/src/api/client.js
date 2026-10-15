/**
 * CivilWorld Centralized API Client
 * Manages standard JSON requests, multipart file uploads, HttpOnly cookie credentials, and token fallbacks.
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

async function uploadRequest(endpoint, formData) {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = {};
  if (inMemoryToken) {
    headers['Authorization'] = `Bearer ${inMemoryToken}`;
  }

  const config = {
    method: 'POST',
    headers,
    credentials: 'include',
    body: formData,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const error = new Error(data.message || `Upload failed with status ${res.status}`);
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
  // Telemetry & Audit
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

  // Construction Projects Portfolio Manager
  getProjects: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.publicationStatus && filters.publicationStatus !== 'all') params.append('publicationStatus', filters.publicationStatus);
    if (filters.page) params.append('page', filters.page);
    return request(`/admin/projects?${params.toString()}`);
  },
  getProjectById: (id) => request(`/admin/projects/${id}`),
  createProject: (data) =>
    request('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateProject: (id, data) =>
    request(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  publishProject: (id, publicationStatus) =>
    request(`/admin/projects/${id}/publish`, {
      method: 'PATCH',
      body: JSON.stringify({ publicationStatus }),
    }),
  archiveProject: (id) =>
    request(`/admin/projects/${id}/archive`, {
      method: 'PATCH',
    }),
  deleteProject: (id) =>
    request(`/admin/projects/${id}`, {
      method: 'DELETE',
    }),
  uploadProjectImage: (formData) => uploadRequest('/admin/projects/upload-image', formData),
};

export const publicApi = {
  submitEnquiry: (formData) =>
    request('/public/enquiry', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
  getStats: () => request('/public/stats'),
  getHealth: () => request('/health'),

  // Public Published Projects
  getProjects: (category = 'all', page = 1) =>
    request(`/public/projects?category=${encodeURIComponent(category)}&page=${page}`),
  getProjectBySlug: (slug) => request(`/public/projects/${encodeURIComponent(slug)}`),
};
