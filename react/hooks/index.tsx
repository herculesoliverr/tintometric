import { useContext } from 'react';
import { StoreContext } from '../context/store';

export function useStore() {
   return useContext(StoreContext);
}