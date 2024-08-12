export const $api = {
    get: async <T>(url: string, options: RequestInit = {}): Promise<T> => {
        const response = await fetch(`${__API__}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        return (await response.json()) as T;
    },

    post: async <T>(url: string, options: RequestInit = {}): Promise<T> => {
        const response = await fetch(`${__API__}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        return (await response.json()) as T;
    },
};

export type $apiType = typeof $api;
