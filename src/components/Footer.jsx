function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>© {year} Climate Impact Dashboard</p>
            <p>Powered by OpenWeather API</p>
        </footer>
    );
}

export default Footer;
