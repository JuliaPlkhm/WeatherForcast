import React, { FC} from "react";
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import ButtonGroup from '@mui/material/ButtonGroup';
import './Footer.style.css'

export const Footer: FC = () =>  {
    return (
        <footer className="wrapper-footer">
            <div className="container-footer" style={{ padding: '20px' }}>
                <ButtonGroup className="btnGroup" variant="contained" aria-label=" button group"  >

                    <Link className="btnGroup__item" href="https://www.facebook.com/" target="_blank"  >
                        <FacebookIcon />
                    </Link>


                    <Link className="btnGroup__item" href="https://www.twitter.com/" target="_blank">
                        <TwitterIcon />
                    </Link>

                    <Link className="btnGroup__item" href="https://www.instagram.com/" target="_blank">

                        <InstagramIcon />
                    </Link>

                    <Link className="btnGroup__item" href="https://www.github.com/" target="_blank">
                        <GitHubIcon />
                    </Link>

                </ButtonGroup>

                <p>© 2021</p>
            </div>
        </footer>

    );
}