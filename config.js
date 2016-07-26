module.exports = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/allenbros'
}


// <div ng-controller="DashboardController as dash">
//
//   <ul><li ng-repeat="site in dash.data">SITE: {{site.baseURL}}
//
//       <ul><li ng-repeat="session in site.sessions">SESSION: {{session.platform}}, {{session.browser}}, ID: {{session.sessionId}}
//
//         <ul><li ng-repeat="click in session.clicks">CLICK: X:{{click.clickX}}, Y:{{click.clickY}}, scrollX:{{click.scrollX}}, scrollY:{{click.scrollY}}, State: {{click.currentState}}
//         </li></ul>
//       </li></ul>
//     </li></ul>
// </div>

// {
//
//                 state: 'heatmap',
//                 config: {
//                     url: '/heatmap',
//                     templateUrl: '/app/dashboard/heatmap.tmpl.html',
//                     controller: 'DashboardController',
//                     controllerAs: 'dashboardCtrl',
//                 }
//             }
