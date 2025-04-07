import { Routes, Route } from 'react-router-dom';
 import IndexPage from './pages/IndexPage';
 import ListPage from './pages/ListPage';
 import LoginPage from './pages/LoginPage';
 import DetailPage from './pages/DetailPage';
 import UpdatePage from './pages/UpdatePage';

 
 function App() {
   return (
       <Routes>
         <Route path="/" element={<IndexPage />} />
         <Route path="/list" element={<ListPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/update/:id" element={<UpdatePage />} />
         <Route path="/detail/:id" element={<DetailPage />} />
       </Routes>
   );
 }

export default App;
