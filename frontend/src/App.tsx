import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage';
import Header from './components/Header/Header';
import ItemsPage from './features/items/ItemsPage';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<ItemsPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
