import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UnitModal from './UnitModal';

const AddUnitButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

return (
    <div>
      <Button
        variant="contained"
        sx={{ color: 'white', borderRadius: '10px', background: '#24a0ed' }}
        onClick={openModal}
      >
        Add Unit
      </Button>
      {isModalOpen && <UnitModal onClose={closeModal} />}
    </div>
    )
}

export default AddUnitButton