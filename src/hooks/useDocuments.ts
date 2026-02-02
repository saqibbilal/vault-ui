import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDocuments, createDocument } from "@/lib/api/documents";
import { CreateDocumentRequest } from "@/types";

export function useDocuments() {
    return useQuery({
        queryKey: ["documents"],
        queryFn: fetchDocuments, // Clean reference to our API function
    });
}

export function useCreateDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newDoc: CreateDocumentRequest) => createDocument(newDoc),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
}