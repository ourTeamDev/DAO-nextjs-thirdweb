"use client";

const { default: Layout } = require("../components/Layout")
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Contact = () => {
    return (
    <Layout title="Prize Page">
      <div className={styles.container}>
          <p className="font-bold">Prize page</p>
        <div className={styles.card}>
          <Image className="" src="/ev.jpg" width={200} height={200} alt="EV"/>
          <p className="font-bold">150000Token</p>
        </div>
        <div className={styles.card}>
          <Image className="" src="/bev.jpg" width={200} height={200} alt="BEV"/>
          <p className="font-bold">100000Token</p>
        </div>
      </div>
    </Layout>
    )
  }
  
  export default Contact;