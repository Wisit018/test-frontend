import { Routes, Route , } from 'react-router-dom';
import Navbar from './Navbar';
import News from './news';
import NewCreate from './NewCreate';
import NewUpdate from './NewUpdate';
import NewView from './NewView';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/create" element={<NewCreate />} />
        <Route path="/update/:newsId" element={<NewUpdate />} />
        <Route path="/view/:newsId" element={<NewView />} />
      </Routes>
    </div>
  );
}

export default App;
