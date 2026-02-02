import api from "@/lib/axios";
import { CreateDocumentRequest } from "@/types";

// Simple, explicit Axios functions
export const fetchDocuments = async () => {
    const response = await api.get("/api/v1/documents");
    console.log(response.data);
    return response.data.data;
};

export const createDocument = async (data: CreateDocumentRequest) => {
    const response = await api.post("/api/v1/documents", data);
    return response.data;
};