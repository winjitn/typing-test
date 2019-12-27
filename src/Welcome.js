import React from "react";

export default props => {
  return (
    <div className="welcome">
      <div>Welcome to the typing test</div>
      <div>
        <button
          onClick={() => props.nextPage(false)}
          id="welcome-btn"
          className="ui red fluid button massive"
        >
          Press to start
        </button>
      </div>
    </div>
  );
};
