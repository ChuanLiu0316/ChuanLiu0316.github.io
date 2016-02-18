var Title = React.createClass({
  render: function() {
    return (
      <div>			
        <div className="title">
          <h1>Chuan Liu</h1>
        </div>
        <ChatRoom />
      </div>
    );
  }
});
ReactDOM.render(
  <Title />,
  document.getElementById('content')
);