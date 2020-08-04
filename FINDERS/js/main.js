	$(document).ready(function(){
		$('#searchUser').on('keyup', function(e){
	let username = (e.target.value);
	console.log(username);

	//make request to Github
	$.ajax({
		url:'https://api.github.com/users/'+username,
		data:{
			client_id:'bbd586691ac99e587bb6',
			client_secret:'d2469ca3a3cf38cb03032e096e8875c3075e9d5c'
		}
	}).done(function(user){
	$.ajax({
		url:'https://api.github.com/users/'+username+'/repos',
		data:{
			client_id:'bbd586691ac99e587bb6',
			client_secret:'d2469ca3a3cf38cb03032e096e8875c3075e9d5c'
		}
	}).done(function(repos){
		$.each(repos,function(index,repo){
			$('#repos').append(`
				<div calss="well">
				<div class="row">
				<div class="col-md-7">
				<strong>${repo.name}</strong>:${repo.description}
				</div>
				<div class="col-md-3">
				<span class="label label-default">Forks:${repo.forks_count}</span>
				<span class="label label-default">Watchers:${repo.watchers_count}</span>
				<span class="label label-default">Stars:${repo.stargazers_count}</span>
				</div>

				<div class="col-md-2">
				<a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
				</div>
				</div>
				</div>

				`);
		});
	});
		$('#profile').html(`
			<div class="panel panel-default">
				<div clas="panel-heading">
					<h3 class="panel-title">${user.name}</h3>
				</div>
				<div class ="panel-body">
					<div class="row">
						<div class="col-md-3">
							<img class="thumbnail avatar" src="${user.avatar_url}">
							<a target ="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
						</div>
					
						<div class="col-md-9">
							<span class="label label-default">Public Repos:${user.public_repos}</span>
							<span class="label label-default">Public Gists:${user.public_gists}</span>
							<span class="label label-default">Followers:${user.followers}</span>
							<span class="label label-default">Following:${user.following}</span>
							<br></br>
							<ul class="list-group">
								<li class="list-group-item">Company:${user.company}</li>
								<li class="list-group-item">Website/blog:${user.blog}</li>
								<li class="list-group-item">Location:${user.location}</li>
								<li class="list-group-item">Member Since:${user.created_at}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<h3 class="page-header">Latest Repos</h3>
				<div id="repos"></div>
`);
}

);});
});	