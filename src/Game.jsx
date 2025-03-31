import React, { Component } from "react";
import Emulator from "./jsnes/Emulator";
import "./game.css";
import Controller from "./components/controller";
import { Link } from "react-router-dom";

class Game extends Component {
  state = {
    romName: null,
    romData: null,
    running: false,
    paused: false,
    loading: false,
    loadedPercent: 0,
    error: null,
  };

  componentDidMount() {
    this.handleDownloadAndRun(
      `https://nes-revival-server.onrender.com/games/${location.hash.replace(
        "#/game?title=",
        ""
      )}/rom`
    );
  }

  handleDownloadAndRun = async (url) => {
    this.setState({ loading: true, romName: url.split("/").pop() });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to download ROM");
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (e) => this.handleLoaded(e.target.result);
      reader.readAsBinaryString(blob);
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleLoaded = (data) => {
    this.setState({
      running: true,
      loading: false,
      romData: data,
      error: null,
    });
  };

  handlePauseResume = () => {
    this.setState((prev) => ({ paused: !prev.paused }));
  };

  render() {
    const { romName, romData, running, paused, loading, loadedPercent, error } =
      this.state;

    return (
      <div id="GameMain">
        <br />
        <div className="Game">
          {/* <nav className="navbar navbar-expand">
          <span className="navbar-text mx-auto">
            {romName || "Loading ROM..."}
          </span>
          <button onClick={this.handlePauseResume} disabled={!running}>
            {paused ? "Resume" : "Pause"}
          </button>
        </nav> */}

          {error ? (
            <p>{error}</p>
          ) : loading ? (
            <progress
              value={loadedPercent}
              max="100"
              className="progress-bar"
            />
          ) : romData ? (
            <div className="crt-container">
              <Emulator romData={romData} paused={paused} />
              <Link to="../" id="powerButton">
                POWER
              </Link>
            </div>
          ) : (
            <p>Loading ROM, please wait...</p>
          )}
          <div id="controls">
            <Controller />
            <div id="info">
              <br />
              <p>
                <kbd>A</kbd> &rarr; <kbd>X</kbd>
                <br />
                <kbd>B</kbd> &rarr; <kbd>Z</kbd>
                <br />
                <kbd>Start</kbd> &rarr; <kbd>Enter</kbd>
                <br />
                <kbd>Select</kbd> &rarr; <kbd>Right Ctrl</kbd>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
