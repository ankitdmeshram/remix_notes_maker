import { Link } from "@remix-run/react";
import homeStyles from '~/styles/home.css'
import NewNote from "../components/NewNote";
export default function Index() {
  return (
    <>
      <main id="content">
        <h1>A better way of keeping track of your notes</h1>
        <p>Try our early beta and never loose track of your notes</p>
        <p id="cta">
          <Link to="/notes">Try Now</Link>
        </p>
      </main>
    </>
  );
}

export function links(){
  return [{rel: 'stylesheet', href: homeStyles}]
}