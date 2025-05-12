import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';
import * as writerService from './../features/writer/writerService';
import type { Retiro, DocumentoStats } from './../features/writer/writerService';

type State = {
  saldo: number;
  retiros: Retiro[];
  documentos: DocumentoStats[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  saldo: 0,
  retiros: [],
  documentos: [],
  loading: false,
  error: null,
};

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DASHBOARD'; payload: { saldo: number; retiros: Retiro[]; documentos: DocumentoStats[] } }
  | { type: 'ADD_RETIRO'; payload: Retiro };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DASHBOARD':
      return {
        ...state,
        saldo: action.payload.saldo,
        retiros: action.payload.retiros,
        documentos: action.payload.documentos,
        loading: false,
        error: null,
      };
    case 'ADD_RETIRO':
      return {
        ...state,
        retiros: [...state.retiros, action.payload],
        saldo: state.saldo - action.payload.cantidad,
      };
    default:
      return state;
  }
}

type WriterContextType = {
  state: State;
  fetchDashboard: () => Promise<void>;
  retirarSaldo: () => Promise<void>;
};

const WriterContext = createContext<WriterContextType | undefined>(undefined);

export const WriterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchDashboard = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { saldoActual, retiros, documentos } = await writerService.fetchDashboard();
      dispatch({
        type: 'SET_DASHBOARD',
        payload: {
          saldo: saldoActual, // aquí haces el puente
          retiros,
          documentos
        },
      });

    } catch (error: any) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message || 'Error al cargar dashboard de escritor',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const retirarSaldo = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const retiro = await writerService.retirarSaldo();
      dispatch({ type: 'ADD_RETIRO', payload: retiro });
    } catch (error: any) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message || 'Error al realizar retiro',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <WriterContext.Provider value={{ state, fetchDashboard, retirarSaldo }}>
      {children}
    </WriterContext.Provider>
  );
};

export const useWriter = () => {
  const context = useContext(WriterContext);
  if (!context)
    throw new Error('useWriter debe usarse dentro de un WriterProvider');
  return context;
};
