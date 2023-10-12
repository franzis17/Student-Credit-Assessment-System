import Button from '@mui/material/Button';

/**
 * This button is reusable, just pass:
 * > content = the name outputted in the button
 * > onClick = the callback function that handles the click event
 */
const SimpleButton = (params) => {
  
  const content = params.content;
  const handleClickEvent = params.onClick;
  const margins = params.margins;


  const buttonStyle = {
    position: 'absolute',
    top: '15px',
    right: '410px',
    color: 'white',
    borderRadius: '10px',
    background: '#228B22',
    zIndex: 1200,
  };
  
  return (
    <Button
      variant="contained"
      sx={buttonStyle}
      onClick={handleClickEvent}
    >
      {content}
    </Button>
  );
  
};

export default SimpleButton;
