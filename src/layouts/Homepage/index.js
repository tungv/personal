/* @flow */
import React from "react"

import LatestPosts from "../../components/LatestPosts"

const Homepage = () => (
  <main>
    <style jsx>{`
      main {
        display: flex;
        width: 100vw;
        flex-direction: column;
      }

      .hero {
        display: flex;
        flex: 1 0 320px;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: #336699;
      }

      .hero h1 {
        color: rgba(255, 255, 255, 0.87);
        font-size: 48px;
      }
    `}</style>
    <section className="hero">
      <h1>Tung</h1>
    </section>
    <section>
      <LatestPosts />
    </section>
  </main>
)
export default Homepage
