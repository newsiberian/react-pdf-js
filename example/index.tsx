import 'react-app-polyfill/ie11';
import React, { useState } from 'react';
import { render } from 'react-dom';

import Pdf from '../.';
import file from './pdfs/basic.pdf';

const App = () => {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(true)

  return (
    <>
      <button onClick={() => setShow(prevState => !prevState)}>toggle show</button>
      {show && (
        <Pdf
          file={file}
          page={page}
        >
          {({ pdfDocument, canvas }) => (
            <>
              {!pdfDocument && <span>Loading...</span>}
              {canvas}
              {Boolean(pdfDocument?.numPages) && (
                <nav>
                  <ul className="pager">
                    <li className="previous">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    <li className="next">
                      <button
                        disabled={page === pdfDocument?.numPages}
                        onClick={() => setPage(page + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </Pdf>
      )}
    </>
  );
};

render(<App />, document.getElementById('root'));
