import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IDocument, { IDocumentState } from "model/document";
import api from "utils/api";

// omit imports and state

export const fetchDocs = createAsyncThunk("docs/fetchDocs", async () => {
    const response = await api.get("/document/get");
    const data: IDocument[] = response.data;
    return data;
});

export const getDocBySlug = createAsyncThunk(
    "docs/getDocBySlug",
    async (slug: string) => {
        const response = await api.get("/document/get/" + slug);
        const data: IDocument = response.data;
        return data;
    }
);
export const addDoc = createAsyncThunk(
    "docs/addDoc",
    async (doc: IDocument) => {
        const docData = {
            title: doc.title,
            uid: doc.uid,
            team: doc.team,
            group: doc.group,
            content: doc.content,
        };
        await api.post("/document/add", docData);
    }
);

export const updateDoc = createAsyncThunk(
    "docs/updateDoc",
    async (doc: IDocument) => {
        const docData = {
            title: doc.title,
            uid: doc.uid,
            team: doc.team,
            group: doc.group,
            content: doc.content,
        };
        const response = await api.put("/document/update/" + doc.id, docData);
        const data: IDocument = response.data;
        return data;
    }
);

const initialState: IDocumentState = {
    curDoc: {},
    developer: {
        convention: [],
        web: [],
        mobile: [],
        ai: [],
    },
    media: {
        convention: [],
        photo: [],
        content: [],
        design: [],
    },
    event: {
        convention: [],
        pr: [],
        event: [],
        hr: [],
    },
    loading: false,
};

const documentSlice = createSlice({
    name: "documentations",
    initialState,
    reducers: {
        // omit reducer cases
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDocs.fulfilled, (state, action) => {
            state.curDoc = {};
            state.developer = {
                convention: [],
                web: [],
                mobile: [],
                ai: [],
            };
            state.media = {
                convention: [],
                photo: [],
                content: [],
                design: [],
            };
            state.event = {
                convention: [],
                pr: [],
                event: [],
                hr: [],
            };
            action.payload.forEach((doc: IDocument) => {
                if (state[doc.team]?.[doc.group]) {
                    state[doc.team][doc.group].push(doc);
                }
            });
        });
        builder.addCase(addDoc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addDoc.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(updateDoc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateDoc.fulfilled, (state, action) => {
            state.loading = false;
            state.curDoc = action.payload;
        });
        builder.addCase(getDocBySlug.fulfilled, (state, action) => {
            state.curDoc = action.payload;
        });
    },
});

export default documentSlice.reducer;
