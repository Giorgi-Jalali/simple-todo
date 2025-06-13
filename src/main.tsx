import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {ThemeProvider} from './providers/ThemeProvider';
import {Provider} from "react-redux";
import {store} from "./store/store";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
)




