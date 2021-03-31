import React from 'react';
import Alert from '@material-ui/lab/Alert';

const Error = ({mensaje}) => {
    return ( 
         
        <Alert severity="error">{mensaje}</Alert>
     );
}
 
export default Error;