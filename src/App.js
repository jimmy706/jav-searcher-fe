import React from 'react';
import AppRouter from './AppRouter';
import Header from './components/header/Header';
import Sidebar from './components/drawer/Sidebar';
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const containerStyle = makeStyles({
  root: {
    border: "1px solid #60606085",
    borderRadius: "10px",
    minHeight: "100vh"
  }
});

function App() {
  let [openDrawer, setDrawer] = React.useState(true);

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
          <Container fixed={true} className={containerStyle().root}>
            <AppRouter />
          </Container>
        </main>

      </div>

    </div>
  );
}


export default App;
