import "./Header.css"

function Header(){

    const styles_nav = {
        display: "inline-block",
        padding: "20px",
        margin: "20px",
        align: "center",
        fontFamily: "Georgia, serif",
        fontSize: "1.4em",
        backgroundColor: "#ebebeb",
        borderRadius: "15px"
    }
    const styles_login = {
        padding: "20px",
        margin: "20px",
        align: "center",
        fontFamily: "Georgia, serif",
        fontSize: "1.4em",
        border: "2px solid black",
        borderRadius: "15px",
        boxShadow: "3px 2px",
        backgroundColor: "rgb(0 141 66 / 57%)"
    }
    const style_logo = {
        width: "125px",
        height: "125px",
        paddingTop: "10px",
        margin: "5px"
    }

    return (
        <header>
            <div class="headerup">
                <div>
                    <ul>
                        <li><img src="./src/assets/facebook.svg"></img></li>
                        <li><img src="./src/assets/instagram.svg"></img></li>
                        <li><img src="./src/assets/twitter.svg"></img></li>
                    </ul>
                </div>
            </div>
            <div class="headerdown">
                <div>
                    <img style={style_logo} src="./wetteren_logo.svg"></img>
                </div>
                <div>
                    <nav>
                        <ul>
                            <li style={styles_nav}><a href="/">Accueil</a></li>
                            <li style={styles_nav}><a href="/Agenda">Agenda</a></li>
                            <li style={styles_nav}><a href="#">Magasin</a></li>
                            <li style={styles_nav}><a href="#">Actualités</a></li>
                            <li style={styles_nav}><a href="/gestionnaire">Gestionnaire</a></li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <a style={styles_login} href="/login">Se connecter</a>
                </div>
            </div>
        </header>
    );
}

export default Header