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
  
  return (
    <Button
      variant="contained"
      sx={
        {
          color: 'white', borderRadius: '10px', background: '#24a0ed',
          marginLeft: '10px', marginBottom: '10px',
        }
      }
      onClick={handleClickEvent}
    >
      {content}
    </Button>
  );
  
};

export default SimpleButton;
