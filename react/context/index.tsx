import React from 'react';
import StoreContextContainer from './store';


export default function AppContext({ children }: ContextChildren) {
   return (
         <StoreContextContainer>
            {children}
         </StoreContextContainer>
   );
}
