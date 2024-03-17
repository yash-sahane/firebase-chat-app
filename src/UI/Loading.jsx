import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = ({ size = 20 }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress className='loading_icon' size={size} /> {/* Use the size prop here */}
        </Box>
    );
}

export default Loading;