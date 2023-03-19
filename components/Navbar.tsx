import Link from "next/link"
import styles from "../styles/Home.module.css";



const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link href="/">HOME</Link>
            <Link href="/leaderboard-page">DAO</Link>
            <Link href="/prize-page">Prize</Link>
            <Link href="/contact-page">Contact</Link>
        </nav>
    )
}

export default Navbar