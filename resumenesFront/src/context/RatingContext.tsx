import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';
import * as ratingService from './../features/rating/ratingService';
import type { Valoracion, RatingData } from './../features/rating/ratingService';

type State = {
  valoraciones: Valoracion[];
  media: number;
  total: number;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  valoraciones: [],
  media: 0,
  total: 0,
  loading: false,
  error: null,
};

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DATA'; payload: RatingData }
  | { type: 'ADD_VALORACION'; payload: Valoracion }
  | { type: 'DELETE_VALORACION' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DATA':
      return {
        ...state,
        valoraciones: action.payload.valoraciones,
        media: action.payload.media,
        total: action.payload.total,
        error: null,
        loading: false,
      };
    case 'ADD_VALORACION':
      return {
        ...state,
        valoraciones: [...state.valoraciones, action.payload],
        total: state.total + 1,
        media:
          (state.media * state.total + action.payload.estrellas) /
          (state.total + 1),
      };
    case 'DELETE_VALORACION':
      return { ...state }; // la recarga posterior la maneja fetchValoraciones
    default:
      return state;
  }
}

type RatingContextType = {
  state: State;
  fetchValoraciones: (documentId: number) => Promise<void>;
  submitValoracion: (
    documentId: number,
    estrellas: number,
    comentario: string
  ) => Promise<void>;
  deleteValoracion: (documentId: number) => Promise<void>;
};

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export const RatingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchValoraciones = async (documentId: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await ratingService.fetchValoraciones(documentId);
      dispatch({ type: 'SET_DATA', payload: data });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error al cargar valoraciones' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const submitValoracion = async (
    documentId: number,
    estrellas: number,
    comentario: string
  ) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const nueva: Valoracion = {
        usuario: 'Tú', // o usar el email si lo tienes en el contexto
        estrellas,
        comentario,
      };

      await ratingService.submitValoracion(documentId, estrellas, comentario);
      dispatch({ type: 'ADD_VALORACION', payload: nueva }); // 🔥 actualiza al instante
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error al enviar valoración' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };


  const deleteValoracion = async (documentId: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await ratingService.deleteValoracion(documentId);
      await fetchValoraciones(documentId); // recarga tras eliminar
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error al eliminar valoración' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <RatingContext.Provider
      value={{
        state,
        fetchValoraciones,
        submitValoracion,
        deleteValoracion,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => {
  const context = useContext(RatingContext);
  if (!context)
    throw new Error('useRating debe usarse dentro de un RatingProvider');
  return context;
};
