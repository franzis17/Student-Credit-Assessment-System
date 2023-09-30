import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    customSpacing: {
       margin: theme.spacing(0.5),  // Adjusts margin
       padding: theme.spacing(0.5), // Adjusts padding
    },
 }));

 export default useStyles