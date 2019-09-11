import React, { useState } from 'react';
import AppRouter from './AppRouter';
import Header from './components/header/Header';
import Sidebar from './components/drawer/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from "react-router-dom";
import { Dialog, Container } from '@material-ui/core';
import MovieModalForm from "./components/modals/MovieModalForm";
import ActressModalForm from "./components/modals/ActressModalForm";

let modalType = null;

const containerStyle = makeStyles({
  root: {
    border: "1px solid #60606085",
    borderRadius: "10px",
    minHeight: "100vh"
  }
});


function App() {
  let [openDrawer, setDrawer] = useState(true);
  let [openModal, setModal] = useState(false);

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(!openDrawer);
  };

  const toggleModal = (type) => {
    modalType = type;
    setModal(true);
  }

  const handleClose = () => {
    setModal(false);
  }

  const renderModalContent = () => {
    switch (modalType) {
      case 'MOVIE':
        return <MovieModalForm handleClose={handleClose} />
      case 'MODEL':
        return <ActressModalForm handleClose={handleClose} />
      default:
        return <MovieModalForm handleClose={handleClose} />
    }
  }


  return (
    <BrowserRouter>
      <div id="App">
        <Header toggleDrawer={toggleDrawer} />
        <div className="wrapper">
          <Sidebar open={openDrawer} toggleModal={toggleModal} />
          <main className="main-content">
            <Container fixed={true} className={containerStyle().root}>
              <AppRouter />
            </Container>
          </main>
        </div>
      </div>



      <Dialog open={openModal} onClose={handleClose} aria-labelledby="form-dialog-title" scroll={'paper'}>
        {renderModalContent()}
      </Dialog>
    </BrowserRouter>
  );
}


export default App;
