// GET https://rickandmortyapi.com/api
// {
//   "characters": "https://rickandmortyapi.com/api/character",
//   "locations": "https://rickandmortyapi.com/api/location",
//   "episodes": "https://rickandmortyapi.com/api/episode"
//   }
import { useReducer, useEffect } from "react";
import axios from "axios";

interface State {
  data: Personaje[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

export interface Personaje {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: NameUrl;
  location: NameUrl;
  image: string;
  episode: String[];
  url: string;
  created: string;
}

interface NameUrl {
  name: string;
  url: string;
}

const initialState: State = {
  data: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: any[] }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "NEXT_PAGE" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null, data: [] };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
        hasMore: action.payload.length > 0,
      };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

const useFetchAPI = (url: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await axios.get(`${url}?page=${state.page}`);
        dispatch({ type: "FETCH_SUCCESS", payload: response.data.results });
      } catch (error: any) {
        // VALIDAR TIPADO DEL ERROR
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };

    if (state.hasMore) {
      fetchData();
    }
  }, [url, state.page]);

  const loadMore = () => {
    if (state.hasMore && !state.loading) {
      dispatch({ type: "NEXT_PAGE" });
    }
  };

  const loadingMore = state.loading && state.page > 1;

  return { ...state, loadMore, loadingMore };
};

export default useFetchAPI;
