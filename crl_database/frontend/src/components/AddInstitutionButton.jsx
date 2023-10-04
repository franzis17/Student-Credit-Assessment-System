import React, { useState } from 'react';
import Button from '@mui/material/Button';
import InstitutionModal from './InstitutionModal';

const AddInstitutionButton = () => {
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
        > Add Institution </Button>
        {isModalOpen && <InstitutionModal onClose={closeModal} />}
    </div>
    )
}

export default AddInstitutionButton