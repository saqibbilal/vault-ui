/**
 * Entities: These mirror your Laravel Resources (UserResource, DocumentResource)
 */
export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export interface Document {
    id: number;
    title: string;
    content: string | null; // Nullable because Laravel validation says 'nullable'
    type: 'note' | 'file'; // This is a Union inside an interface => Using a Union type is better than just 'string'
    file_path: string | null;     // Optional: Laravel likely returns the URL/path for files
    mime_type: string | null;
    size: number | null;
    created_at: string;
}

/**
 * Request Payloads: These mirror your Laravel FormRequests (StoreDocumentRequest)
 */
export interface CreateDocumentRequest {
    title: string;
    content?: string;       // Optional if it's a file
    type: 'note' | 'file';
    file?: File;            // For when we implement the actual upload
}

export interface LoginRequest {
    email: string;
    password: string;
}