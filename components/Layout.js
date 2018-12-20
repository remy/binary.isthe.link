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
        min-height: calc(100vh - 44px);
      }
    `}</style>
    <main>
      <style jsx>{`
        main {
          max-width: 90%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 44px);
        }

        main > div {
          flex: 1;
        }

        footer p {
          font-size: 14px;
        }
        p {
          font-size: 14px;
          color: #999;
          line-height: 1.4;
        }

        p:first-child {
          margin-top: 2.5rem;
        }

        p a {
          color: #666;
          font-size: 14px;
        }
      `}</style>
      <div>{children}</div>
      <footer>
        <p>
          This project visualises how signed and unsigned binary works. You can
          change the value by tapping the binary column headings or entering a
          decimal value at the bottom. Further reading can be{' '}
          <a
            target="_blank"
            href="https://www3.ntu.edu.sg/home/ehchua/programming/java/datarepresentation.html"
          >
            found here
          </a>
          . I've also made a{' '}
          <a target="_blank" href="https://bitcalc.app">
            bit calculator
          </a>
          .
        </p>
        <p>
          Built by{' '}
          <a target="_blank" href="https://twitter.com/rem">
            @rem
          </a>{' '}
          on a rainy day ☔️
        </p>
      </footer>
    </main>
  </>
);
