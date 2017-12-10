'use strict';
(function(){

  class NavbarController {
    //start-non-standard
    menu = [
      {
        'title': 'Home',
        'state': 'main',
        'hasDropDown' : false
      },
      {
        'title': 'Services',
        'state': '',
        'hasDropDown' : true,
        'sublinks' : [
          {
            'title': 'Plans',
            'state': 'services'
          },
          {
            'title': 'Rentals',
            'state': 'rentals'
          }
        ]
      },
      {
        'title': 'Testimonials',
        'state': '',
        'hasDropDown' : true,
        'sublinks' : [
          {
            'title': 'Recent Events',
            'state': 'liveGallery'
          },
          {
            'title': 'Celebrations',
            'state': 'celebrations'
          },
          {
            'title': 'Corporate',
            'state': 'corporate'
          },
          {
            'title': 'Weddings',
            'state': 'weddings'
          }
        ]
      },
      {
        'title': 'Contact Us',
        'state': 'reservations',
        'hasDropDown' : false
      },
      {
        'title': 'Vendors',
        'state': 'links',
        'hasDropDown' : false
      },
      {
        'title': 'About Us',
        'state': 'aboutus',
        'hasDropDown' : false
      }
    ];

    isCollapsed = true;
    //end-non-standard

  // made a chage on line 76 to contain client not customer

    navigate(){
      var curUsr = this.getCurrentUser();
      let state = this.state;
      this.Evs.getByUser(curUsr._id)
      .then(function(response) {
        var events = response.data;
        state.go('client.welcome', {userID: curUsr._id, userName: curUsr.name, events: events});
      }, function(err) {
        //do something
        console.log(err);
      });

    }

  //Added this.isSuperAdmin to constructor, line 85
    constructor(Auth, $state, $scope, Events) {
      this.isLoggedIn = Auth.isLoggedIn;
      this.isSuperAdmin = Auth.isSuperAdmin;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;
      //this.curUsr = this.getCurrentUser();
      //this.$state.go('customer', {userID: this.curUsr._id, userName: this.curUsr.name})
      this.state = $state;

      this.Evs = Events;

      //this.navigate();
    }
  }
  angular.module('essenceEventsRepoApp')
  .controller('NavbarController', NavbarController);
})();
// 'use strict';
//
// angular.module('essenceEventsRepoApp')
//   .controller('NavbarController', ['Auth', '$state', '$scope', 'Events',function(Auth, $state, $scope, Events){
//     $scope.menu=[
//         {
//           'title': 'Home',
//           'state': 'main',
//           'hasDropDown' : false
//         },
//         {
//           'title': 'Services',
//           'state': '',
//           'hasDropDown' : true,
//           'sublinks' : [
//             {
//               'title': 'Plans',
//               'state': 'services'
//             },
//             {
//               'title': 'Rentals',
//               'state': 'rentals'
//             }
//           ]
//         },
//         {
//           'title': 'Testimonials',
//           'state': '',
//           'hasDropDown' : true,
//           'sublinks' : [
//             {
//               'title': 'Recent Events',
//               'state': 'liveGallery'
//             },
//             {
//               'title': 'Celebrations',
//               'state': 'celebrations'
//             },
//             {
//               'title': 'Corporate',
//               'state': 'corporate'
//             },
//             {
//               'title': 'Weddings',
//               'state': 'weddings'
//             }
//           ]
//         },
//         {
//           'title': 'Contact Us',
//           'state': 'reservations',
//           'hasDropDown' : false
//         },
//         {
//           'title': 'Vendors',
//           'state': 'links',
//           'hasDropDown' : false
//         },
//         {
//           'title': 'About Us',
//           'state': 'aboutus',
//           'hasDropDown' : false
//         }
//       ];
//       $scope.isCollapsed=true;
//
//
//   }]);
