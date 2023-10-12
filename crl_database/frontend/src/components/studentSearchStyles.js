import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '80vw',
    minWidth: '300px',
    margin: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '200px',
    backgroundColor: '#3169c3',
    color: 'white',
    borderRadius: '50%',
    padding: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  searchInput: {
    marginBottom: '20px',
    padding: '10px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  resultList: {
    border: '1px solid #ccc',
    maxHeight: '150px',
    overflowY: 'auto',
    marginBottom: '20px',
    borderRadius: '4px',
  },
  selectedNotes: {
    marginTop: '20px',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  },
  noteText: {
    fontSize: '16px',
    fontWeight: '500',
  },
  idText: {
    fontSize: '14px',
    color: '#777',
  },
}));

export default useStyles