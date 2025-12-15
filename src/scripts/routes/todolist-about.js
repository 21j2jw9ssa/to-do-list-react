import '../../styles/todolist-about-style.css'; // UI for about info

const ABOUT_CONTENTS = [
  ( // How it was made
    <article>
      <h2>How is it made?</h2>
      <p>
        This site is mostly written in ReactJS.
      </p>
      <p>
        While it involves plain HTML/CSS/JavaScript a lot,<br/>
        ReactJS is this site's main structure.
      </p>
      <p>
      </p>
    </article>
  ),
  ( // How it started
    <article>
      <h2>How it started</h2>
    </article>
  ),
] ;

for ( let i = 0 ; i < ABOUT_CONTENTS.length ; i++ ) {
  ABOUT_CONTENTS[i] = { article: ABOUT_CONTENTS[i], index: i } ;
} // for

Object.freeze( ABOUT_CONTENTS ) ;

export default function TODOLIST_PAGE3_ABOUT() {
  return (
    <section>
      <h1 className="title">About this app</h1>
      <ul>
        {
          ABOUT_CONTENTS.map( content =>
            <li key={`about-me-article-no-${content.index}`}>
              {content.article}
            </li>
          )
        }
      </ul>
    </section>
  ) ;
} // TODOLIST_PAGE3_ABOUT()