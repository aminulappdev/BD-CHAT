(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);


// ----------------------------- Dynamic chat script --------------

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

var userData = JSON.parse(getCookie('user'));

// ------------------------- Single chat start .............

var sender_id = userData._id;
var receiver_id;
var global_group_id;
var socket = io('/user-namespace', {
	auth: {
		token: userData._id, // Sender id pass into server
	}
});


$(document).ready(function () {
	$('.user-list').click(function () {

		var userId = $(this).attr('data-id'); // Fetch receiver id from client side
		receiver_id = userId;

		$('.start-head').hide();
		$('.chat-section').show();

		socket.emit('existsChat', { sender_id: sender_id, receiver_id: receiver_id }) // send Exist chating into server
	})
})


// update user online user
socket.on('getOnlineUser', function (data) {
	$('#' + data.user_id + '-status').text('Online');
	$('#' + data.user_id + '-status').removeClass('offline_status');
	$('#' + data.user_id + '-status').addClass('online_status');
});

// update user offline user
socket.on('getOfflineUser', function (data) {
	$('#' + data.user_id + '-status').text('Offline');
	$('#' + data.user_id + '-status').addClass('offline_status');
	$('#' + data.user_id + '-status').removeClass('online_status');
})


// Save chat of user
$('#chat-form').submit(function (event) {
	event.preventDefault();

	var message = $('#message').val(); // Fetch current-user message from client           
	$.ajax({
		url: '/save-chat',
		type: 'POST',
		data: { sender_id: sender_id, receiver_id: receiver_id, message: message },
		success: function (response) {
			if (response.success) {
				console.log(response.data.message);
				$('#message').val('');
				let chat = response.data.message;

                var createdAt = new Date(response.data.createdAt); // You can replace this with your actual date
                var formattedDate = createdAt.toLocaleString(); // Format the date and time

				let html = `<div class="current-user-chat" id = `+response.data._id+ `><h5>` + chat + `<i class="fa fa-trash" aria-hidden="true" data-id = '`+response.data._id+`'  data-toggle="modal" data-target="#deleteChatModel"></i></h5>
				<div class = "user-data"><b>Me </b>`+ formattedDate +`</div>
				
				</div>`;

				$('#chat-container').append(html);

				socket.emit('newChat', response.data); // Post current user data into server side

				scrollChat();
			}
			else {
				alert(data.msg);
			}
		}
	});
    

	
	
})


// Fetch another user data using socket and show
socket.on('loadNewChat', function (data) {
    console.log(data)
	
	var createdAt = new Date(data.createdAt); // You can replace this with your actual date
	var formattedDate = createdAt.toLocaleString(); // Format the date and time

	if (sender_id == data.receiver_id && receiver_id == data.sender_id) {
		let html = `<div class="distance-user-chat" id='`+data._id+`'><h5>` + data.message + `</h5>
		 <div class = "user-data"><b>You </b>`+ formattedDate +`</div>
		</div>`;
		$('#chat-container').append(html);

		scrollChat();
	}

});

// Load old chat
socket.on('loadChat', function (data) {
	$('#chat-container').html('');
	var chats = data.chats;
	let html = '';

	for (let x = 0; x < chats.length; x++) {
		let addClass = '';
		if (chats[x]['sender_id'] == sender_id) {
			addClass = 'current-user-chat';
		}
		else {
			addClass = 'distance-user-chat';
		}

		html += `<div class="` + addClass + `" id= '`+chats[x]['_id']+`'><h5>` + chats[x]['message'] + ``;

		if (chats[x]['sender_id'] == sender_id) {
			html += `<i class="fa fa-trash" aria-hidden="true" data-id = '`+chats[x]['_id']+`'  data-toggle="modal" data-target="#deleteChatModel"></i>`;
		}
		html += `</h5>`;


		var createdAt = new Date(chats[x]['createdAt']); // You can replace this with your actual date
		var formattedDate = createdAt.toLocaleString(); // Format the date and time

		if(chats[x]['sender_id'] == sender_id)
		{
			html += `
			  <div class = "user-data"><b>Me </b>`+ formattedDate +`</div>
			`
		}
		else
		{
			html += `
			<div class = "user-data"><b>You </b>`+ formattedDate +`</div>
		  `
		}

	  html +=`
		  
	  </div>`;
	}

	$('#chat-container').append(html);

	scrollChat();
});

function scrollChat() {
	$('#chat-container').animate({
		scrollTop: $('#chat-container').offset().top + $('#chat-container')[0].scrollHeight
	}, 0)
}


// Delete chat
 $(document).on('click', '.fa-trash', function(){
	let msg = $(this).parent().text();
	$('#delete-message').text(msg)

	$('#delete-message-id').val($(this).attr('data-id'));
 });


// delete chat front-end
$('#delete-chat-form').submit(function(event){
	 event.preventDefault();

	 var id = $('#delete-message-id').val();
	 
	 $.ajax({
		url:'/delete-chat',
		type:'POST',
		data:{id:id},
		success:function(res){
			if(res.success == true)
			{
				$('#'+id).remove();
				$('#deleteChatModel').modal('hide');
				
				socket.emit('chatDeleted',id);
			}
			else
			{
				alert(res.msg);
			}
		}

	 })

}) ;

socket.on('chatMessageDeleted', function(id){
	$('#'+id).remove();
})

// ------------------------ Single chat end ...................


// -------------------- Multiple chat start ...................

// add member js
$('.addMember').click(function(){
   
	var id = $(this).attr('data-id'); // fetch data id from client side
	var limit = $(this).attr('data-limit'); // fetch data limit from client side
    

	$('#group_id').val(id);
	$('#limit').val(limit);
  
	$.ajax({
		url:'/get-members',
		type:'POST',
		data:{group_id:id},
		success:function(res){
			console.log(res)
			if(res.success == true)
			{ 
				let users = res.data;
				let html = '';
				for (let i = 0; i < users.length ; i++) {

					let isMemberGroup = users[i]['member'].length > 0? true:false;
                    // `+(isMemberGroup?'checked':'')+`
					
					html+= `
					<tr>
					  <td> 
						<input type="checkbox" `+(isMemberGroup?'checked':'')+` name="members[]" value="`+users[i]['_id']+`" />
					  </td>
					  <td> 
					  `+users[i]['name']+`
					  </td>
					</tr>
				 `;	
				}
                
				$('.addMemberInTable').html(html);

			}
			else
			{
				alert(res.msg);
			}
		}

	 })



})

// add member form submit code

$('#add-member-form').submit(function(event){
    event.preventDefault();

	var formData = $(this).serialize(); // fetch data from client side
    console.log('Formdata is :'+formData);
	$.ajax({
		url:'/add-members',
		type:'POST',
		data:formData,
		success:function(res){
			if(res.success)
			{
				$('#memberModal').modal('hide');
				$('#add-member-form')[0].reset();
				alert(res.msg);

			}
			else
			{
                $('#add-member-error').text(res.msg);
				setTimeout(() => {
					$('#add-member-error').text('');
				}, 3000);
			}
		}

	 })

})

// Update group script

$('.updateMember').click(function (){

	var obj = JSON.parse($(this).attr('data-obj'));

	$('#update_group_id').val(obj._id);
	$('#last_limit').val(obj.limit);
	$('#group_name').val(obj.name);
	$('#group_limit').val(obj.limit);
})

$('#updateChatGroupForm').submit(function(event){
	event.preventDefault();

	$.ajax(
		{
			url: "/update-chat-group",
			type:"POST",
			data : new FormData(this),
			contentType:false,
			cache: false,
			processData: false,
			success: function(res){
				
				alert(res.msg);
				if(res.success)
				{					
					location.reload()
				}
			}
		
		}
	)
})

// Delete chat group

$('.deleteGroup').click(function(){

	$('#delete_group_id').val($(this).attr('data-id'));
	$('#delete_group_name').text($(this).attr('data-name'));

});

$('#deleteChatGroupForm').submit(function(e){
	e.preventDefault();

	var formData = $(this).serialize();

	$.ajax(
		{
			url: "/delete-chat-group",
			type:"POST",
			data : formData,
			success: function(res){
				
				alert(res.msg);
				if(res.success)
				{					
					location.reload()
				}
			}
		
		}
	)
})

// Copy sharable link

$('.copy').click(function(){

	$(this).prepend('<span class = "copied_text"> Copied</span>');

	var group_id = $(this).attr('data-id');
	var url = window.location.host+'/share-group/'+group_id; // Group url

	var temp = $("<input>");
	$("body").append(temp);
	temp.val(url).select();
	document.execCommand("copy");

	temp.remove();

	setTimeout(()=>{
		$('.copied_text').remove();
	},2000)

})

// Join group from link

$('.join-now').click(function(){

	$(this).text('wait...');
	$(this).attr('disabled','disabled');

	var group_id = $(this).attr('data-id');

	$.ajax({
		url: "/join-group",
		type:"POST",
		data: {group_id:group_id},
		success:function(res){
			if(res.success){
				location.reload();
			}
			else{
				$(this).text('Join Now');
				$(this).removeAttr('disabled');
			}
		}

	})

})

// Group chatting section --------------------

function groupScrollChat() {
	$('#chat-container').animate({
		scrollTop: $('#chat-container').offset().top + $('#chat-container')[0].scrollHeight
	}, 0)
}

$('.group-list').click(function(){

	$('.group-start-head').hide();
	$('.group-chat-section').show();

	global_group_id = $(this).attr('data-id');

	loadGroupChats();
})

// Save Grouchat of user
$('#group-chat-form').submit(function (event) {
	event.preventDefault();

	var message = $('#group-message').val(); // Fetch current-user message from client           
	$.ajax({
		url: '/group-chat-save',
		type: 'POST',
		data: { sender_id: sender_id, group_id: global_group_id, message: message },
		success: function (response) {
			if (response.success) {
				
				$('#group-message').val('');
				let message = response.chat.message;

				// Show Current user data
				let html = `<div class="current-user-chat" id = `+response.chat._id+ `><h5> 
				      <span> ` + message + ` </span>
					  <i class="fa fa-trash deleteGroupChat" aria-hidden="true" data-id = '`+response.chat._id+`'  data-toggle="modal" data-target="#deleteGroupChatModel"></i>
					  </h5>`;
                      
                      var date = new Date(response.chat.createdAt);
					  let cDate = date.getDate();
					  let cMonth = (date.getMonth()+1) > 9 ? (date.getMonth()+1):'0'+(date.getMonth()+1);
					  let cYear = date.getFullYear();
					  let getFullDate = cDate+'-'+cMonth+'-'+cYear;
			
					  html += `
					  <div class = "user-data"><b>Me </b>`+ getFullDate +`</div>
					  </div>`;
				$('#group-chat-container').append(html);

				socket.emit('newGroupChat', response.chat); // Post current user data into server side
				

				groupScrollChat();
			}
			else {
				alert(data.msg);
			}
		}
	})
});


// Fetch another user Group data using socket and show

socket.on('loadNewGroupChat',function(data){

	if(global_group_id == data.group_id)
	{
		let html = `<div class="distance-user-chat" id = `+data._id+ `><h5> 
		<span> ` + data.message + ` </span>
		</h5>`;
		
		var date = new Date(data.createdAt);
		let cDate = date.getDate();
		let cMonth = (date.getMonth()+1) > 9 ? (date.getMonth()+1):'0'+(date.getMonth()+1);
		let cYear = date.getFullYear();
		let getFullDate = cDate+'-'+cMonth+'-'+cYear;
	  
		html += `
		<div class = "user-data">
			<img src="`+ data.sender_id.image +`" class = "user-chat-image"/>
			<b> `+ data.sender_id.name +` </b>
			`+ getFullDate +`</div>
		</div>`;		
		$('#group-chat-container').append(html);

		groupScrollChat();
	}	
})

function loadGroupChats() {
	$.ajax({
		url:"/load-group-chat",
		type:"POST",
		data: {group_id:global_group_id},
		success: function(res){
			if(res.success)
			{
                var chats = res.chats;
				var html = '';

				for(let i=0; i<chats.length; i++)
				{
					let className = 'distance-user-chat';

					if(chats[i]['sender_id']._id == sender_id)
					{
						className = 'current-user-chat';
					}

					html += `<div class="`+className+`" id = `+chats[i]['_id']+ `><h5> 
					<span> ` + chats[i]['message'] + ` </span>`;

					if(chats[i]['sender_id']._id == sender_id)
					{
						html += `
						<i class="fa fa-trash deleteGroupChat" aria-hidden="true" data-id = '`+chats[i]['_id']+`'  data-toggle="modal" data-target="#deleteGroupChatModel"></i>`;
						
					}

                    html += `
					  </h5>`;

                      var date = new Date(chats[i]['createdAt']);
					  let cDate = date.getDate();
					  let cMonth = (date.getMonth()+1) > 9 ? (date.getMonth()+1):'0'+(date.getMonth()+1);
					  let cYear = date.getFullYear();
					  let getFullDate = cDate+'-'+cMonth+'-'+cYear;

					  if(chats[i]['sender_id']._id == sender_id)
					  {
                          html += `
						    <div class = "user-data"><b>Me </b>`+ getFullDate +`</div>
						  `
					  }
					  else
					  {
						html += `
						<div class = "user-data">
						<img src="`+ chats[i]['sender_id'].image +`" class = "user-chat-image"/>
						<b> `+ chats[i]['sender_id'].name +` </b>
						`+ getFullDate +`</div>
					  `
					  }

					html +=`
                        
					</div>`;
				}

				$('#group-chat-container').html(html);

                groupScrollChat();
			}
			else
			{
               alert(res.msg)
			}
		}
	})
}

// Delete group chat

$(document).on('click','.deleteGroupChat', function(){
	var msg = $(this).parent().find('span').text();

	$('#delete-group-message').text(msg);
	$('#delete-group-message-id').val($(this).attr('data-id'));
})

$('#delete-group-chat-form').submit(function(e){
	e.preventDefault();

	var id = $('#delete-group-message-id').val();

	$.ajax({
		url:"/delete-group-chat",
		type:"POST",
		data: {id:id},
		success:function(res){
			if(res.success){
				$('#'+id).remove();
                $('#deleteGroupChatModel').modal('hide');

				socket.emit('groupChatDeleted',id)
			}
			else
			{
				alert(res.msg)
			}
		}

	})
})


// Delete group chat

socket.on('GroupChatMessageDeleted', function(id){
	$('#'+id).remove();
})




