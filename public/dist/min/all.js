angular.module("app").controller("adminCtrl",function(t,e,n,o,a){t.projects=e.data,t.admins=n,t.addProject=a.addProject,t.tasks=o,t.showProjectForm=!1,t.showAddMenu=!1,t.addProject=function(e,n,o,s,i,r,c,l){t.showProjectForm=!1,a.newSubmission(e,n,o,s,i,r,c,l).then(function(){a.getProjects().then(function(e){e.data&&(t.projects=e.data,t.selectedProject=e.data[e.data.length-1])})})},t.deleteProject=function(e){a.deleteProject(e).then(function(){a.getProjects().then(function(e){t.projects=e.data}),a.getTasks().then(function(e){t.tasks=e})})},t.addTask=function(e,n,o){a.addTask(e,n,o).then(function(e){a.getProject(e._id).then(function(e){t.selectedProject=e,a.getTasks().then(function(e){t.tasks=e}),a.getProjects().then(function(e){t.projects=e.data})})})},t.addAdmin=function(e,n,o){a.addAdmin(e,n,o).then(function(){a.getAdmins().then(function(e){t.admins=e})})},t.markTaskAsDeleted=function(e,n){a.markTaskAsDeleted(e).then(function(){a.getProject(n).then(function(e){t.selectedProject=e}),a.getTasks().then(function(e){t.tasks=e}),a.getProjects().then(function(e){t.projects=e.data})})},t.markTaskAsCompleted=function(e,n){a.markTaskAsCompleted(e).then(function(){a.getProject(n).then(function(e){t.selectedProject=e}),a.getTasks().then(function(e){t.tasks=e}),a.getProjects().then(function(e){t.projects=e.data})})},t.markTaskAsNew=function(e,n){a.markTaskAsNew(e).then(function(){a.getProject(n).then(function(e){t.selectedProject=e}),a.getTasks().then(function(e){t.tasks=e}),a.getProjects().then(function(e){t.projects=e.data})})},t.unassignedTaskFilter=function(t){return!t.assignedTo},t.assignedToFilter=function(e){return!(!e.assignedTo||!t.selectedAdmin||e.assignedTo._id!==t.selectedAdmin._id)},t.updateSelectedProject=function(e){t.selectedProject=e},t.updateSelectedAdmin=function(e){t.selectedAdmin=e},t.toggleProjectForm=function(){t.showProjectForm?t.showProjectForm=!1:t.showProjectForm=!0},t.toggleAddMenu=function(){t.showAddMenu?t.showAddMenu=!1:t.showAddMenu=!0},t.closeAllMenus=function(){t.showProjectForm&&(t.showProjectForm=!1),t.showAddMenu&&(t.showAddMenu=!1)}}),angular.module("app").controller("loginCtrl",function(t){t.LogInWithGitHub=function(){window.location="https://allenbros.herokuapp.com/auth/github"}}),angular.module("app").controller("mainCtrl",function(t){t.toggleMenu=function(){var t=document.getElementById("main-menu");""===t.style.width?(t.style.width="96vw",t.style.height="200px",t.style.opacity="1"):(t.style.width="",t.style.height="",t.style.opacity="0")},t.clickedPage=function(){var t=document.getElementById("main-menu");""!==t.style.width&&(t.style.width="",t.style.height="",t.style.opacity="0")},t.jumpToHome=function(){window.scrollTo(0,0)},t.jumpToWhy=function(){window.scrollTo(0,.95*screen.height)},t.jumpToWho=function(){window.scrollTo(0,1.8*screen.height)},t.jumpToWhat=function(){window.scrollTo(0,2.75*screen.height)},t.jumpToHow=function(){window.scrollTo(0,5*screen.height)},window.sr=ScrollReveal({duration:2e3,distance:"200px",scale:.6,viewFactor:.8}),sr.reveal(".connecting-line",500),sr.reveal("#jordan-pic",500),sr.reveal("#caleb-pic",500),sr.reveal("#jordan-info",500),sr.reveal("#caleb-info",500),sr.reveal("#come-to-life",500),sr.reveal("#by",500),sr.reveal("#for",5e3)}),angular.module("app").controller("questionnaireCtrl",function(t,e){t.newSubmission=e.newSubmission}),angular.module("app").service("projectService",function(t,e,n){this.newSubmission=function(e,o,a,s,i,r,c,l){if(!e||!o||!i)return alert("Project not submitted. Please fill out all fields"),void n.go("main");var u=i,d="pending",m={questionnaire:{contactName:e,contactEmail:o,contactPhone:a,contactRole:s,company:i,companyURLs:r,projectDescription:c,goalDate:l},information:{projectName:u,projectOwner:e,approvalStatus:d}};return t.post("/api/projects",m).then(function(){console.log("successfully added to database")},function(){console.log("Invalid Project Submission")})},this.addAdmin=function(e,n,o){var a={firstName:e,lastName:n,githubUN:o};return t.post("/api/admins",a).then(function(t){return t},function(){console.log("Did not add new admin")})},this.getAdmins=function(){return t.get("/api/admins").then(function(t){return t.data},function(){console.log("could not get admins")})},this.getProjects=function(){return t({method:"GET",url:"/api/projects"}).then(function(t){return"string"==typeof t.data.redirect?void(window.location="https://allenbros.herokuapp.com"+t.data.redirect):t})},this.getProject=function(e){return t.get("/api/projects/"+e).then(function(t){return t.data},function(){console.log("Invalid GET project")})},this.customTaskFilter=function(t){for(var e=[],n=0;n<o.length;n++)o[n].show&&e.push(o[n]);return e.indexOf(t.status)!=-1},this.addProject=function(e,n,o,a,s,i,r,c,l,u){var d={questionnaire:{contactName:e,contactEmail:n,contactPhone:o,contactRole:a,company:s,companyURLs:i,projectDescription:r,goalDate:c},information:{projectName:l,projectOwner:e,approvalStatus:"approved"}};return t.post("/api/projects",d).then(function(){console.log("successfully added to database")},function(){console.log("Invalid Project Submission")})},this.deleteProject=function(e){if(e.tasks)for(var n=0;n<e.tasks.length;n++)t["delete"]("/api/tasks/"+e.tasks[n]._id);return t["delete"]("/api/projects/"+e._id).then(function(t){return t.data})},this.getTasks=function(){return t.get("/api/tasks").then(function(t){return t.data},function(){console.log("could not get tasks")})},this.addTask=function(e,n,o){if(o)var a={task:{assignedTo:o,text:n}};else var a={task:{text:n}};return t.put("/api/projects/"+e,a).then(function(t){return t.data},function(){alert("Invalid Task Submission")})},this.markTaskAsDeleted=function(e,n){return t.patch("/api/tasks/"+e,{status:"deleted"}).then(function(){},function(){alert("Task could not be deleted")})},this.markTaskAsCompleted=function(e,n){return t.patch("/api/tasks/"+e,{status:"complete"}).then(function(){},function(){alert("Task could not be marked complete")})},this.markTaskAsNew=function(e,n){return t.patch("/api/tasks/"+e,{status:"new"}).then(function(){},function(){alert("Task could not be marked new")})};var o=[{status:"new",show:!0},{status:"complete",show:!1},{status:"deleted",show:!1}];this.toggleNewTaskDisplay=function(){o[0].show?o[0].show=!1:o[0].show=!0},this.toggleCompleteTaskDisplay=function(){o[1].show?o[1].show=!1:o[1].show=!0},this.toggleDeletedTaskDisplay=function(){o[2].show?o[2].show=!1:o[2].show=!0}}),angular.module("app",["ui.router"]).config(function(t,e){e.otherwise("/"),t.state("admin",{url:"/admin",templateUrl:"./views/admin.html",controller:"adminCtrl",controllerAs:"c",resolve:{projects:function(t){return t.getProjects()},admins:function(t){return t.getAdmins()},tasks:function(t){return t.getTasks()}}}).state("admin.project",{url:"/project",templateUrl:"./views/admin.project.html"}).state("admin.admin",{url:"/admin",templateUrl:"./views/admin.admin.html"}).state("admin.unassigned",{url:"/admin/unassigned",templateUrl:"./views/admin.unassigned.html"}).state("admin.addAdmin",{url:"/addadmin",templateUrl:"./views/admin.addadmin.html"}).state("login",{url:"/login",templateUrl:"./views/login.html",controller:"loginCtrl"}).state("main",{url:"/",templateUrl:"./views/main.html",controller:"mainCtrl"}).state("questionnaire",{url:"/questionnaire",templateUrl:"./views/questionnaire.html",controller:"questionnaireCtrl"}).state("thankyou",{url:"/thankyou",templateUrl:"./views/thankyou.html"})});