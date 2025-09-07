import '../style/Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© {new Date().getFullYear()} Desenvolvido por Endrew Berthold.</p>
            </div>
        </footer>
    );
};

export default Footer;
