import {
    post as amplifyPost,
    get as amplifyGet,
    del as amplifyDel,
    put as amplifyPut
} from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';

/**
 * The final, corrected wrapper that adds an auth token to an Amplify API request.
 * @param requestFn The original Amplify function (e.g., amplifyPost)
 * @returns A new async function that performs the authenticated request.
 */
const withAuth = (requestFn: Function) => {
    // The wrapper returns a new async function
    return async (path: string, options: any = {}): Promise<any> => {
        try {
            const session = await fetchAuthSession();
            const token = session.tokens?.idToken?.toString();

            if (!token) {
                throw new Error('User is not authenticated.');
            }

            // Create a new headers object for the request
            const newHeaders = {
                ...options.headers,
                Authorization: token,
            };

            // --- THIS IS THE CORRECTED PART ---
            // We now correctly construct the nested `options` object that Amplify expects.
            const result = requestFn({
                apiName: 'RestaurantMenuAPI',
                path,
                options: {
                    ...options, // Spreads the original options (like `body` or `queryParams`)
                    headers: newHeaders, // Adds/overwrites the headers property within `options`
                },
            });

            return result;
        } catch (error) {
            console.error('API Client Error:', error);
            throw error;
        }
    };
};

/**
 * Wrapper for public API requests (no authentication required)
 * @param requestFn The original Amplify function (e.g., amplifyPost)
 * @returns A new async function that performs a public request.
 */
const withoutAuth = (requestFn: Function) => {
    return async (path: string, options: any = {}): Promise<any> => {
        try {
            const result = requestFn({
                apiName: 'RestaurantMenuAPI',
                path,
                options,
            });
            return result;
        } catch (error) {
            console.error('Public API Client Error:', error);
            throw error;
        }
    };
};

// Authenticated API methods
export const authedPost = withAuth(amplifyPost);
export const authedGet = withAuth(amplifyGet);
export const authedPut = withAuth(amplifyPut);
export const authedDel = withAuth(amplifyDel);

// Public API methods (no authentication)
export const publicPost = withoutAuth(amplifyPost);
export const publicGet = withoutAuth(amplifyGet);
export const publicPut = withoutAuth(amplifyPut);
export const publicDel = withoutAuth(amplifyDel);