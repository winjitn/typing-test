import React from "react";

import "./Game.css";

class Game extends React.Component {
  state = { text: "", current: 0, done: false, wpm: 0 };
  text = [
    "Its deep darkness was total but something about its speluncar acoustics fortold, clearing its throat hollowly, great things, and he hurried to his own quarters to fetch a couple of flashlights and a pedometer.",
    "The question is in a way meaningless, she knows, but one must ask. Love in such situations is rarely real. Sex is the engine, exalting and ruining people, sex and frustration. Love is what people believe is worth the path of devastation.",
    "When I met Belle, I understood that I had just entered this second age. I also understood that I hadn’t reached the third age, in which anticipation of the loss of happiness prevents you from living.",
    "Your only chance of survival, if you are sincerely smitten, lies in hiding this fact from the woman you love, of feigning a casual detachment under all circumstances. What sadness there is in this simple observation!",
    "In the hospital men’s room, as I’m washing my hands, I glance in the mirror. The man I see is not so much me as my father. When did he show up?"
  ];

  rand = Math.floor(Math.random() * 4);

  input = React.createRef();

  chosen = this.text[this.rand].split(" ");

  componentDidMount() {
    this.start = new Date().getTime();
  }

  renderTest() {
    var chosen = this.chosen;

    var testArray = chosen.map(word => word.split(""));
    return testArray.map((word, index) => {
      var hold = [];
      for (var i = 0; i < word.length; i++) {
        hold.push(
          <span key={index.toString() + i} id={`_${index}`} pos={i}>
            {word[i]}
          </span>
        );
      }
      hold.push(<span> </span>);
      return hold;
    });
  }

  async onType(e) {
    var inputValue = e.target.value.trim().split("");
    var currentWord = document.querySelectorAll(`#_${this.state.current}`);
    if (this.state.current === this.chosen.length - 1) {
      if (e.target.value === this.chosen[this.chosen.length - 1]) {
        await this.setState({
          done: true,
          text: "",
          wpm: Math.ceil(
            this.chosen.length / ((new Date().getTime() - this.start) / 60000)
          )
        });
        this.input.current.setAttribute("disabled", "");
      }
    }
    for (var i = 0; i < currentWord.length; i++) {
      const hold = currentWord[i];
      if (i < inputValue.length) {
        if (
          inputValue[i] === hold.innerHTML &&
          hold.classList.contains("pos") === false
        ) {
          if (hold.classList.contains("neg")) hold.classList.toggle("neg");
          hold.classList.toggle("pos");
        } else if (
          inputValue[i] !== hold.innerHTML &&
          hold.classList.contains("neg") === false
        ) {
          if (hold.classList.contains("pos")) hold.classList.toggle("pos");
          hold.classList.toggle("neg");
        }
      } else {
        if (hold.classList.contains("pos")) hold.classList.toggle("pos");
        if (hold.classList.contains("neg")) hold.classList.toggle("neg");
      }
    }
    if (this.state.done === false)
      this.setState({ text: e.target.value.trim() });
  }

  test(e) {
    //32 for space
    if (e.which === 32) {
      if (this.state.text === this.chosen[this.state.current]) {
        this.setState({ text: "", current: this.state.current + 1 });
      }
    }
  }

  render() {
    return (
      <div className="game-ctn">
        <div className="game-inner"> {this.renderTest()}</div>
        <div className="input-ctn">
          <input
            ref={this.input}
            className="input-field "
            value={this.state.text}
            onChange={e => this.onType(e)}
            onKeyPress={e => this.test(e)}
            autoFocus
          ></input>
        </div>
        {this.state.done === true ? (
          <div className="results">
            WPM:<span>{this.state.wpm}</span>
            <button
              onClick={() => this.props.reset(true)}
              className="ui positive button"
              style={{ marginLeft: "20px" }}
            >
              Start Over
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Game;
