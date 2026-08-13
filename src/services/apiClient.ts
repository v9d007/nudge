/**
 * Service Layer Abstraction Contract
 * Configured to support REST APIs, GraphQL clients, or Firebase Firestore drivers.
 */

export interface ApiClientConfig {
  baseUrl?: string;
  useMock: boolean;
}

const defaultConfig: ApiClientConfig = {
  baseUrl: 'https://api.nudge.app/v1',
  useMock: true,
};

export class ApiClient {
  private config: ApiClientConfig;

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  public async get<T>(endpoint: string, mockFallbackData: T): Promise<T> {
    if (this.config.useMock) {
      // Simulate network delay for real-world feel
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockFallbackData;
    }

    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[ApiClient] Request to ${endpoint} failed, using mock data.`, error);
      return mockFallbackData;
    }
  }

  public async post<T, R>(endpoint: string, payload: T): Promise<R> {
    if (this.config.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { success: true, ...payload } as unknown as R;
    }

    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await response.json();
  }
}

export const apiClient = new ApiClient();
