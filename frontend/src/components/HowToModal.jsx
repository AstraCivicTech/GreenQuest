import "../styles/HowToModal.css";

export const HowToModal = ({ setShowModal, showModal }) => {
  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className="how-to-modal">
        <button onClick={handleModalToggle}>
          Learn How to Create Challenges!
        </button>
        {showModal && (
          <div className="modal-overlay" onClick={handleModalToggle}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>How-Tos: Creating a Challenge!</h2>
              <div className="modal-body">
                <h3>
                  <span className="highlight">
                    Steps to Create a Challenge:
                  </span>
                </h3>
                <ol>
                  <li>
                    <span className="highlight">Login/Sign Up</span> and
                    navigate to the{" "}
                    <span className="highlight">Challenges</span> page
                  </li>
                  <li>Input the challenge description</li>
                  <li>
                    The{" "}
                    <span className="highlight">Key to a Good Challenge</span>{" "}
                    description:
                    <ul>
                      <li>
                        <span className="highlight">Be descriptive</span> , a
                        sentence or two is perfect!
                      </li>
                      <li>
                        Your challenge{" "}
                        <span className="highlight">
                          should NOT have malicious intent
                        </span>
                        , i.e. "Kill a Bird" will not work.
                      </li>
                      <li>
                        We at <span className="highlight">GreenQuest</span> love
                        a difficult challenge, though all challenges should be
                        able to be completed within a week.
                      </li>
                      <li>
                        Challenges you create should reflect the{" "}
                        <span className="highlight">GreenQuest mission.</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    If you don't get it right the first time don't worry! You
                    will be given challenge specific feedback so that you can
                    start your <span className="highlight">GreenQuest</span>{" "}
                    journey!
                  </li>
                  <li>
                    Finally, submit your challenge and{" "}
                    <span className="highlight">have fun!</span>
                  </li>
                </ol>
              </div>
              <button onClick={handleModalToggle}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
