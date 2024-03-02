import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage';
import Header from './components/Header/Header';
import ItemsPage from './features/items/ItemsPage';
import ItemPage from './features/items/ItemPage';
import LoginPage from './features/users/LoginPage';
import ItemForm from './features/items/ItemForm';

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
            <Route path="/items/:id" element={<ItemPage />} />
            <Route path="submit" element={<ItemForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
