import React, {  useState, useContext } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import ButtonGroup from '@mui/material/ButtonGroup';
// const Input = styled('input')({
//   display: 'none',
// });

export default function Footer() {
  return (
    <footer style={{backgroundColor: '#1565c0'}}>
    <div className="container" style={{padding: '20px'}}>
    <ButtonGroup variant="contained" aria-label=" button group" sx={{mb: 2}} >
  
            <Link href="https://www.facebook.com/" target="_blank" >
                <FacebookIcon/>
            </Link>
        
        
            <Link href="https://www.twitter.com/" target="_blank">
                <TwitterIcon/>
                </Link>
      
            <Link href="https://www.instagram.com/" target="_blank">
                
                <InstagramIcon/>
            </Link>
        
            <Link href="https://www.github.com/" target="_blank">
                <GitHubIcon/>
            </Link>
    
    </ButtonGroup>
    
    <p>© 2021</p>
    </div>
</footer>
//     <Stack direction="row" alignItems="center" spacing={2}>
      
//         <Button variant="contained" startIcon={<PhotoCamera />} component="span">
//         </Button>
//         <Link href='https://mui.com/components/buttons/#contained-buttons' underline="none">
//         <PhotoCamera />
// </Link>
//         <IconButton color="primary"  component="span">
//           <PhotoCamera />
//         </IconButton>
//     </Stack>
  );
}