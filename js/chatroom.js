/* 
	Structure 
	- ChatRoom
		- ChatList
			- Chat
		- ChatForm (including submit button, etc)	
*/
var hello = "asdqweasldkjlkajsdlkjqwe";
console.log(hello);

var CHAT_ROOM_SOCKET_SERVER_ADDRESS = "https://mysterious-chamber-42289.herokuapp.com/"
var ChatRoom = React.createClass({
    getInitialState: function() {
      return {data: []};
    },
	componentDidMount: function(){
		console.log(this.state.data);
		this.socket = io.connect(CHAT_ROOM_SOCKET_SERVER_ADDRESS);
		this.socket.on('chat message', function(data){
			console.log(this.state.data);
			var chats = this.state.data;
			console.log('end');
			chats.push(data)
			this.setState({data: chats});
		}.bind(this));

	},
	sendChat: function(data){
		this.socket.emit('chat message', data);
	},
	render :function(){
		return (
			<div className="chatRoom">
				<h1>Chat</h1>
				<ChatList data= {this.state.data} />
				<ChatForm onChatSubmit={this.sendChat} />
			</div>
		);
	}

});

var ChatList = React.createClass({

	render: function(){

		var chatNodes = this.props.data.map(function(chat){
			return (
				<Chat message = {chat.message}/>
			);
		});

		return (
			<div className="chatList">
				{chatNodes}
			</div>
		);
	}
});

var Chat = React.createClass({
	render: function(){
		return (
			<div className="chat">
				
				<p className="chatMessage">{this.props.message}</p>
			</div>
		);
	}
});

var ChatForm = React.createClass({
	getInitialState: function() {
    	return {message: ''};
  	},
  	handleMessageChange: function(e){
  		this.setState({message: e.target.value})
  	},
  	handleSubmit: function(e){
  		e.preventDefault();
  		var message = this.state.message;
  		if (!message){
  			return;
  		}
  		console.log("asdqwe");
  		this.props.onChatSubmit({message: message});
  		this.setState({message: ''});
  	},
	render : function(){
		return (
		  <form className="commentForm" onSubmit={this.handleSubmit}>
		    <input type="text" value={this.state.message} onChange={this.handleMessageChange} />
		    <input type="submit" value="Send" />
		  </form>
		);
	}
});


ReactDOM.render(
  <ChatRoom />,
  document.getElementById('chatRoom')
);
