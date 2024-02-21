import github from "./../assets/github.svg"
import "./Footer.css";

export function Footer() {
    return (

        <footer className="footer">
            <img src={github} alt="githublogo" className="img-footer"/>
        </footer>
    );
}