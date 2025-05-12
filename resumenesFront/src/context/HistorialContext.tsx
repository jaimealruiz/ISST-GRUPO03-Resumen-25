import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import * as historialService from './../features/historial/historialService'
import type { HistorialItem } from './../features/historial/historialService';

type State = {
  historial: HistorialItem[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  historial: [],
  loading: false,
  error: null,
};

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_HISTORIAL'; payload: HistorialItem[] }
  | { type: 'UPDATE_PROGRESO'; payload: { documentId: number; progreso: number } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_HISTORIAL':
      return { ...state, historial: action.payload, error: null };
    case 'UPDATE_PROGRESO':
      return {
        ...state,
        historial: state.historial.map(item =>
          item.documentId === action.payload.documentId
            ? { ...item, progreso: action.payload.progreso }
            : item
        ),
      };
    default:
      return state;
  }
}

type HistorialContextType = {
  state: State;
  fetchHistorial: () => Promise<void>;
  updateProgreso: (documentId: number, progreso: number) => Promise<void>;
};

const HistorialContext = createContext<HistorialContextType | undefined>(undefined);

export const HistorialProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchHistorial =  useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const historial = await historialService.getHistorial();
      dispatch({ type: 'SET_HISTORIAL', payload: historial });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error al cargar historial' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const updateProgreso = async (documentId: number, progreso: number) => {
    try {
      await historialService.updateProgreso(documentId, progreso);
      dispatch({ type: 'UPDATE_PROGRESO', payload: { documentId, progreso } });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error al actualizar progreso' });
    }
  };

  return (
    <HistorialContext.Provider
      value={{ state, fetchHistorial, updateProgreso }}
    >
      {children}
    </HistorialContext.Provider>
  );
};

export const useHistorial = () => {
  const context = useContext(HistorialContext);
  if (!context)
    throw new Error('useHistorial debe usarse dentro de un HistorialProvider');
  return context;
};
