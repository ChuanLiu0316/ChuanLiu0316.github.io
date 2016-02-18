/* 
	Structure 
	- ChatRoom
		- ChatList
			- Chat
		- ChatForm (including submit button, etc)	
*/

<script src="/socket.io/socket.io.js"></script>
var CHAT_ROOM_SOCKET_SERVER_ADDRESS = ""
window.ChatRoom = React.createClass({
	getInitialState: function(){
		return {data: []};
	},
	componentDidMount: function(){
		this.socket = io(CHAT_ROOM_SOCKET_SERVER_ADDRESS)
		this.socket.on('chat message', function(data){
			console.log(data.message);
			var chats = this.state.data
			var newchats = comments.push(data)
			this.setState({data: newchats});
		});

	},
	sendChat: function(data){
		this.socket.emit('chat message', data);
	},
	render :function(){
		return (
			<div className="chatRoom">
				<h1>Chat</h1>
				<ChatList data= {this.state.data} />
				<ChatForm onChatSend = {this.sentChat} />
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
				//<p className="chatAuthor"> {this.props.author}</p>
				<p className="chatMessage">{this.props.message}</p>
			</div>
		);
	}
});

var ChatForm = React.createClass({
	getInitialState: function() {
    	return {message: ''};
  	},
  	handleMessageChange: function(){
  		this.setState({message: e.target.value})
  	},
  	handleSubmit: function(e){
  		e.preventDefault();
  		var message = this.sate.message;
  		if (!text){
  			return;
  		}
  		this.props.onChatSend({message: message});
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

