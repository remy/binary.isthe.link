export default ({ children }) => (
  <>
    <style global jsx>{`
      html,
      body {
        background: #fefefe;
        color: #212121;
        margin: 0;
        padding: 0;
        min-height: 100%;
      }

      select {
        border: 1px solid #ccc;
        background: rgb(241, 239, 239);
        border-radius: 3px;
        padding: 2px;
      }

      hr {
        border: 0;
        border-bottom: 2px solid #333;
        margin: 1rem 0;
        border-radius: 2px;
      }

      * {
        font-family: 'Ubuntu Mono', monospace;
        font-size: 18px;
      }

      #__next {
        min-height: 100vh;
      }
    `}</style>
    <main>
      <style jsx>{`
        main {
          max-width: 90%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        main > div {
          flex: 1;
        }
      `}</style>
      <div>{children}</div>
      <footer>
        <p>
          Built by <a href="https://twitter.com/rem">@rem</a> on a rainy day ☔️
        </p>
      </footer>
    </main>
  </>
);
