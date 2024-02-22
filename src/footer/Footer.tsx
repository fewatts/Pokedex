import github from "./../assets/github.svg"
import "./Footer.css";

export function Footer() {
    return (

        <footer className="footer">
            <a href="https://github.com/fewatts"><img src={github} alt="githublogo" className="img-footer"/></a>
        </footer>
    );
}