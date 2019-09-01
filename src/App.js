import React from 'react';
import AppRouter from './AppRouter';
import Header from './components/header/Header';
import Sidebar from './components/drawer/Sidebar';

function App() {
  let [openDrawer, setDrawer] = React.useState(false);

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(!openDrawer);
  };


  return (
    <div id="App">
      <Header toggleDrawer={toggleDrawer} />
      <div className="wrapper">
        <Sidebar open={openDrawer} />
        <main className="main-content">
          <AppRouter />
        </main>
      </div>

    </div>
  );
}


export default App;
