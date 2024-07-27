import "./Thanks.css";
import MainHeader from "../components/MainHeader";

function Thanks() {
  return (
    <>
      <MainHeader />
      <div className="thanks">
        <div className="thanks-purple"></div>
        <p>Thank you for applying to our wholesale customer program.</p>

        <p>
          Your request will be analyzed and processed in the following days.
        </p>

        <p>We will notify you if it is approved or not.</p>

        <p>
          If you have any additional questions or need help, please do not
          hesitate to <a href="/contactus">contact us</a>.
        </p>
      </div>
    </>
  );
}

export default Thanks;
