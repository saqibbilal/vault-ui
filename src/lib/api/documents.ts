import api from "@/lib/axios";
import { Document, CreateDocumentRequest } from "@/types";

export async function getDocuments(): Promise<Document[]> {
    const response = await api.get("/api/v1/documents");
    return response.data.data; // Assumes Laravel Resource collection wrapper
}

export async function createDocument(data: CreateDocumentRequest): Promise<Document> {
    const formData = new FormData();

    // Append the required fields
    formData.append("title", data.title);
    formData.append("type", data.type);

    // Append optional fields only if they have values
    if (data.content) {
        formData.append("content", data.content);
    }

    if (data.file) {
        formData.append("file", data.file);
    }

    const response = await api.post("/api/v1/documents", formData, {
        headers: {
            // This tells the browser to set the boundary for the binary data
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export async function deleteDocument(id: number) {
    await api.delete(`/api/v1/documents/${id}`);
}