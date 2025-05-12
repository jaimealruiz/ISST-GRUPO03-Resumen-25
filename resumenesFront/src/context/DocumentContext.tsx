import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from 'react';
import * as documentoService from './../features/documento/documentoService';
import type { Document } from './../features/documento/documentoService';

type State = {
  documents: Document[];
  selectedDocument: Document | null;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  documents: [],
  selectedDocument: null,
  loading: false,
  error: null,
};

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DOCUMENTS'; payload: Document[] }
  | { type: 'SET_SELECTED_DOCUMENT'; payload: Document | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DOCUMENTS':
      return { ...state, documents: action.payload, loading: false, error: null };
    case 'SET_SELECTED_DOCUMENT':
      return { ...state, selectedDocument: action.payload };
    default:
      return state;
  }
}

type DocumentContextType = {
  state: State;
  fetchAllDocuments: () => Promise<void>;
  fetchDocumentById: (id: number) => Promise<void>;
  selectDocument: (doc: Document | null) => void;
  uploadDocument: (
    file: File,
    title: string,
    description: string,
    isFree: boolean,
    type: 'PDF' | 'AUDIO'
  ) => Promise<void>;
};

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAllDocuments = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const docs = await documentoService.getAllDocuments();
      dispatch({ type: 'SET_DOCUMENTS', payload: docs });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error al cargar documentos' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const fetchDocumentById = useCallback(async (id: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const doc = await documentoService.getDocumentById(id);
      dispatch({ type: 'SET_SELECTED_DOCUMENT', payload: doc });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error al cargar el documento' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const selectDocument = useCallback((doc: Document | null) => {
    dispatch({ type: 'SET_SELECTED_DOCUMENT', payload: doc });
  }, []);

  const uploadDocument = useCallback(
    async (
      file: File,
      title: string,
      description: string,
      isFree: boolean,
      type: 'PDF' | 'AUDIO'
    ) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await documentoService.uploadDocument(file, title, description, isFree, type);
        await fetchAllDocuments(); // relista tras subida
      } catch (error: any) {
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Error al subir el documento' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [fetchAllDocuments]
  );

  return (
    <DocumentContext.Provider
      value={{
        state,
        fetchAllDocuments,
        fetchDocumentById,
        selectDocument,
        uploadDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context)
    throw new Error('useDocuments debe usarse dentro de un DocumentProvider');
  return context;
};
