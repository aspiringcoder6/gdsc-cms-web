export default interface IDocument {
    id?: string;
    uid?: string;
    title?: string;
    createdDate?: { seconds: number; nanoseconds: number };
    updatedDate?: { seconds: number; nanoseconds: number };
    team?: "developer" | "media" | "event";
    group?: string;
    content?: string;
    slug?: string;
}

export interface IDocumentState {
    curDoc: IDocument;
    developer: {
        convention: IDocument[];
        web: IDocument[];
        mobile: IDocument[];
        ai: IDocument[];
    };
    media: {
        convention: IDocument[];
        design: IDocument[];
        content: IDocument[];
        photo: IDocument[];
    };
    event: {
        convention: IDocument[];
        event: IDocument[];
        pr: IDocument[];
        hr: IDocument[];
    };
    loading: boolean;
}   
