import styled from "styled-components";

export const DeveloperCard = ({ name, linkedIn, github }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="background" />
        <div className="logo">
          <h1>{name}</h1>
        </div>
        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
          <div className="box box2">
            <span className="icon">
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </span>
          </div>
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer">
          <div className="box box3">
            <span className="icon">
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
              </svg>
            </span>
          </div>
        </a>
        <div className="box box4" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 300px; // Changed from 60%
    height: 400px; // Changed from 60%
    background: lightgrey;
    border-radius: 1.6em;
    overflow: hidden;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 0.8em 3em 0px;
    transition: all 1s ease-in-out;
    user-select: none;
  }

  .background {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 100% 107%, #d4fbe9 35%, #aee7ff 100%);
  }

  .logo {
    position: absolute;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
    transition: all 0.6s ease-in-out;
  }

  .logo .logo-svg {
    fill: #212121;
    width: 3em;
    height: 3em;
  }

  .icon {
    display: inline-block;
    width: 2em;
    height: 2em;
  }

  .icon .svg {
    fill: rgba(255, 255, 255, 0.797);
    width: 100hw;
    transition: all 0.5s ease-in-out;
  }

  .box {
    position: absolute;
    padding: 1em;
    text-align: right;
    background: rgba(255, 255, 255, 0.389);
    border-top: 0.2em solid rgb(255, 255, 255);
    border-right: 0.1em solid white;
    border-radius: 10% 13% 42% 0%/10% 12% 75% 0%;
    box-shadow: rgba(100, 100, 111, 0.364) -0.8em 0.8em 3em 0px;
    transform-origin: bottom left;
    transition: all 1s ease-in-out;
  }

  .box::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  .box:hover .svg {
    fill: white;
  }

  .box1 {
    width: 70%;
    height: 70%;
    bottom: -70%;
    left: -70%;
  }

  .box1::before {
    background: radial-gradient(
      circle at 30% 107%,
      #fdf497 0%,
      #fdf497 5%,
      #ff53d4 60%,
      #62c2fe 90%
    );
  }

  .box1:hover::before {
    opacity: 1;
  }

  .box1:hover .icon .svg {
    filter: drop-shadow(0 0 0.5em white);
  }

  .box2 {
    width: 50%;
    height: 50%;
    bottom: -50%;
    left: -50%;
    transition-delay: 0.2s;
  }

  .box2::before {
    background: radial-gradient(circle at 30% 107%, #0077b5 0%, #00a0dc 90%);
  }

  .box2:hover::before {
    opacity: 1;
  }

  .box2:hover .icon .svg {
    filter: drop-shadow(0 0 0.5em white);
  }

  .box3 {
    width: 30%;
    height: 30%;
    bottom: -30%;
    left: -30%;
    transition-delay: 0.4s;
  }

  .box3::before {
    background: radial-gradient(circle at 30% 107%, #969fff 0%, #b349ff 90%);
  }

  .box3:hover::before {
    opacity: 1;
  }

  .box3:hover .icon .svg {
    filter: drop-shadow(0 0 0.5em white);
  }

  .box4 {
    width: 10%;
    height: 10%;
    bottom: -10%;
    left: -10%;
    transition-delay: 0.6s;
  }

  .card:hover {
    transform: scale(1.1);
  }

  .card:hover .box {
    bottom: -0.1em;
    left: -0.1em;
  }

  .card:hover .logo {
    transform: translate(0, 0);
    bottom: 2em;
    right: 2em;
  }
`;
