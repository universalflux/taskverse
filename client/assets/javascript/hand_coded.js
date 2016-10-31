const taskverse = angular.module('taskverse', ['ngRoute', 'ngCookies']);

// Application config
taskverse.config(function($routeProvider){
  // Routes for the view go here.
  $routeProvider
  .when('/all_users', {
    templateUrl: 'partials/all_users.html'
  })
  .when('/assigned_tasks', {
    templateUrl: 'partials/assigned_tasks.html'
  })
  .when('/chat', {
    templateUrl: 'partials/chat.html'
  })
  .when('/projects', {
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsController'
  })
  .when('/project', {
    templateUrl: 'partials/project.html'
  })
  .when('/download', {
    templateUrl:'partials/download.html'
  });
});

//********** U S E R **********//

// User Service

taskverse.service('UserService', function($http, $cookies){
  let service = {};
  let currentUser = {};
  let encryptedCookie = {};

  service.tokenLogin = (callback) => {
    if($cookies.get('userData')){
      encryptedCookie = JSON.stringify($cookies.getObject('userData'));
      $http.post('/cookie_auth', encryptedCookie)
      .then((data) => {
        currentUser = data.data;
        callback(currentUser);
      });
    } else {
      console.log("No cookie saved.");
    }
  }

  service.loginUser = (data, callback) => {
    $http.post('/login', data).then((data) => {;
    console.log(data);
    currentUser = data.data;
    $cookies.putObject('userData', currentUser);
    callback(currentUser);
  });
  }

  service.createUser = (data, callback) => {
    $http.post('/user', data).then((data) => {
      currentUser = data.data;
      console.log(data.data);
      $cookies.putObject('userData', currentUser);
      console.log("This is the encryptedCookie: " + $cookies.get('userData'));
      callback(currentUser);
    });
  }

  service.obtainUser = (callback) => {
    callback(currentUser);
    return currentUser;
  }

  return service;
});

// Users Controller

taskverse.controller('UsersController', function($route, $location, UserService){
  let vm = this;

  vm.hide = false;
  vm.show = true;
  vm.regHide = false;

  if(!vm.currentUser){
  UserService.tokenLogin((data) => {
    vm.currentUser = data;
    vm.show = false;
    vm.hide = true;
    vm.grabUser();
  });
  }

  vm.grabUser = () => {
    UserService.obtainUser((data) => {
    vm.currentUser = data;
    console.log(vm.currentUser);
   });
  };

  vm.loginUser = (data) => {
    UserService.loginUser(data, (data) => {
    if(data.error){
        console.log(data.error);
        vm.error = data.error;
    } else {
        vm.currentUser = data;
        vm.show = false;
        vm.hide = true;
        vm.grabUser();
      }
    });
  }

  vm.switchToReg = () => {
    vm.show = false;
    vm.regHide = true;
  }

  vm.createUser = (data) => {
  if(data.password == data.confPassword) {
    UserService.createUser(data, (data) => {
      if(data.error){
          vm.error = data.error;
      } else {
          vm.currentUser = data;
          vm.regHide = false;
          vm.hide = true;
          vm.grabUser();
      }
  });
} else {
    vm.noMatch = {error: "Passwords do not match. Check them and try again."}
    }
  }
});


//********** E N D  U S E R **********//

//********** P R O J E C T  **********//

// Project Service

taskverse.service('ProjectService', function($http){
  let service = {};
  let projects = [];
  let currentProject = {};

  service.getAll = (callback) => {
    $http.get('/get_all').then((data) => {
      projects = data.data;
      callback(projects);
    });
  }
  service.createProject = (data, callback) => {
    console.log(data + " has made it to the service.");
    console.log(data);
    $http.post('/project', data).then((data) => {
      console.log(data.data);
      projects = data.data;
      callback(projects);
    });
  };


  service.grabProjects = (callback) => {
    callback(projects);
    return projects;
  };

  service.getProject = (incoming, callback) => {
    console.log(incoming);
    $http.post('/one_project', incoming).then((data) => {
      currentProject = data.data;
      callback(currentProject);
    });
  }

  service.grabProject = (callback) => {
    callback(currentProject);
  };


  return service;
});

// Project Controller
taskverse.controller('ProjectsController', function(ProjectService, UserService, $location){
  let vm = this;

  vm.grabProjects = () => {
    ProjectService.grabProjects((data) => {
      vm.projects = data;
      console.log(data);
    })
  };

  ProjectService.getAll((data) => {
    console.log(data + " has reached the view.");
    vm.projects = data;
    vm.grabProjects();
  })

  vm.grabProject = () => {
    ProjectService.grabProject((data) => {
      vm.currentProject = data;
    });
  }

  vm.grabProject();

  // vm.grabUser = () => {
  //   UserService.grabUser((data) => {
  //     vm.currentUser = data;
  //   })
  // };

  vm.createProject = (data) => {
    console.log(data.name + " has made it to the controller.");
    ProjectService.createProject(data, (data) => {
      console.log(data.name + " has made it to the database and back to the controller")
      vm.projects = data;
      vm.newProject = {};
      vm.grabProjects();
    });
  };


  vm.getProject = (data) => {
    console.log(data + " here in the controller.");
    ProjectService.getProject(data, (data) => {
      console.log(data);
      vm.currentProject = data;
      vm.grabProject();
      $location.path('/project');
    });
  };


});

//********** E N D  P R O J E C T  **********//

// Task Service

taskverse.service('TaskService', function($http){
  let service = {};

  return service;
});

// Task Controller
taskverse.controller('TasksController', function(TaskService, $location){
  const vm = this;
});

//********** E N D  T A S K **********//
