$(document).ready(function(){
   $('#searchUser').on('keyup',function(e){
      let userName = e.target.value;

    $.ajax({
        url:'https://api.github.com/users/'+userName,
        data:{
            client_id :'e5c6c755abb2b88768de',
            client_secret:'e42545564baf12331cb2875f169cd73c8349b88b'
        }
    }).done(function(userData){

        $.ajax({
            url:'https://api.github.com/users/'+userName+'/repos',
        data:{
            client_id :'e5c6c755abb2b88768de',
            client_secret:'e42545564baf12331cb2875f169cd73c8349b88b',
            sort: 'created : asc',
            per_page : 5
            }
        }).done(function(repoData){
            $.each(repoData,function(index,repoData){
                  $('#repos').append(`
                  
                  <div class="card card-body bg-light">
                        <div class="row">
                            <div class="col-md-7">  
                                <strong>${repoData.name}</strong>
                            </div>

                        <div class="col-md-3">                               
                            <span class="badge badge-primary">Forks : ${repoData.forks_count}</span>
                            <span class="badge badge-info">Waters : ${repoData.watchers}</span>
                            <span class="badge badge-success">Stars : ${repoData.stargazers_count}</span>
                        </div>

                        <div class="col-md-2">                           
                            <a href="${repoData.html_url}" target="_blank" class="btn btn-primary"> Repo Page </a>
                        </div>



                        </div>
                  </div>
                  
                  
                  
                  `)  
            });
            

        });


          console.log(userData);
           $('#profile').html(`     
            <div class="panel panel-default">
            
            <div class="panel-heading">
                <h3 class="panel-title">${userData.login}</h3>
            </div>

            <div class="panel-body">
                
                <div class="row">
                        <div  class="col-md-3">
                            <img class="thumbnail avatar" src="${userData.avatar_url}">                               
                             <a target="_blank" class="btn btn-primary btn-block" href="${userData.html_url}"> view Profile </a>
                        </div>
                        <div class="col-md-9">       
                            <span class="badge badge-primary">Public Repo : ${userData.public_repos}</span>
                            <span class="badge badge-info">Public Gists : ${userData.public_gists}</span>
                            <span class="badge badge-success">Followers : ${userData.followers}</span>
                            <span class="badge badge-danger">Following : ${userData.following}</span>                                           
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item"> Company: ${userData.company}</li>
                                <li class="list-group-item"> Website/blog: ${userData.blog}</li>
                                <li class="list-group-item"> Location: ${userData.location}</li>
                                <li class="list-group-item"> Member Since: ${userData.created_at}</li>
                            </ul>

                        </div>                                        
                </div>
            </div>
            </div>
            
            
            <h3 class="page-header"> Latest Repos </h3>
            <div id="repos"></div>
           `);  
   });
})
});