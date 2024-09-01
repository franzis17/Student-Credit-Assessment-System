import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UnitModal from './UnitModal';

const AddUnitButton = ({onUnitSave, institutionList}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const buttonStyle = {
    position: 'absolute',
    top: '15px', // Adjust the top position as needed
    right: '130px', // Adjust the left position as needed
    color: 'white',
    borderRadius: '10px',
    background: '#24a0ed',
    zIndex: 1200,
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={buttonStyle}
        onClick={openModal}
      >
        Add Unit
      </Button>
      {isModalOpen && <UnitModal onClose={closeModal} onUnitSave={onUnitSave} institutionList={institutionList} />}
    </div>
  );
};

export default AddUnitButton;