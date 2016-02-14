var Title = React.createClass({
	render:function() {
		return (
			<div className="title">
				<h1><Chuan Liu </h1>
			</div>
		);
	}
});

ReactDom.render(
	<Title />,
	document.getElementById('content');
);