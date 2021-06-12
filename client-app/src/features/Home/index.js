import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import cn from "classnames";

import "./style.scss";

const Home = ({ className }) => {
  return (
    <div className={cn(className, "home")}>
      <div className="home__wrapper">
        <div className="home__banner banner">
          <div className="banner__wrapper __container">
            <Header className="home__header" />
            <span className="banner__phone" />
            <p className="banner__heading">
              <b>Brainstorming</b> for
              <br /> desired perfect Usability
            </p>
            <p className="banner__description">
              Our design projects are fresh and simple and will benefit
              <br /> your business greatly. Learn more about our work!
            </p>
            <Link to="/stats" className="banner__btn">
              Views Stats
            </Link>
          </div>
        </div>
        <div className="home__content">
          <p className="home__content-main-text">
            Why{" "}
            <b>
              small business owners <br /> love
            </b>{" "}
            AppCo?
          </p>
          <p className="home__content-aux-text">
            Our design projects are fresh and simple and will benefit your
            business <br /> greatly. Learn more about our work!
          </p>
          <div className="flex-row home__cards">
            <div className="home__card some-card">
              <i className="some-card__icon icon-design" />
              <p className="some-card__heading">Clean Design</p>
              <p className="some-card__description">
                Increase sales by showing true <br /> dynamics of your website.
              </p>
            </div>
            <div className="home__card some-card">
              <i className="some-card__icon icon-secure" />
              <p className="some-card__heading">Secure Data</p>
              <p className="some-card__description">
                Build your online store’s trust using <br /> Social Proof &
                Urgency.
              </p>
            </div>
            <div className="home__card some-card">
              <i className="some-card__icon icon-retina" />
              <p className="some-card__heading">Retina Ready</p>
              <p className="some-card__description">
                Realize importance of social proof in <br /> customer’s purchase
                decision.
              </p>
            </div>
          </div>
        </div>
        <div className="home__bottom">
          <form className="home__email-input" onSubmit={() => {}}>
            <input placeholder="Enter your email" type="text" />
            <button type="submit">Subscribe</button>
          </form>
          <Footer className="home__footer" />
        </div>
      </div>
    </div>
  );
};

export default Home;
