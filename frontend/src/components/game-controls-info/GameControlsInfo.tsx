function GameControlsInfo() {
  return (
    <div className="blockforge-controls-info">
      <h2>CONTROLS</h2>

      <div className="blockforge-control-row">
        <span className="blockforge-key">←</span>
        <span>MOVE LEFT</span>
      </div>

      <div className="blockforge-control-row">
        <span className="blockforge-key">→</span>
        <span>MOVE RIGHT</span>
      </div>

      <div className="blockforge-control-row">
        <span className="blockforge-key">↑</span>
        <span>ROTATE</span>
      </div>

      <div className="blockforge-control-row">
        <span className="blockforge-key">↓</span>
        <span>DROP</span>
      </div>

      <div className="blockforge-control-row">
        <span className="blockforge-key blockforge-key-space">
          SPACE
        </span>
        <span>PAUSE</span>
      </div>
    </div>
  );
}

export default GameControlsInfo;