import Dashboard from 'views/Dashboard/Dashboard'
import UserProfile from 'views/UserProfile/UserProfile'
import LeaderBoard from 'views/LeaderBoard/LeaderBoard'
import Notifications from 'views/Notifications/Notifications'
import League1 from 'views/League1/League1'
import League2 from 'views/League2/League2'

const appRoutes = [
  { path: '/dashboard', name: 'Dashboard', icon: 'pe-7s-graph', component: Dashboard },
  { path: '/user', name: 'User Profile', icon: 'pe-7s-user', component: UserProfile },
  { path: '/leaderboard', name: 'Leader Board', icon: 'pe-7s-cup', component: LeaderBoard },
  { path: '/notifications', name: 'Notifications', icon: 'pe-7s-bell', component: Notifications },
  { league: true, path: '/league1', name: 'Start New League', icon: 'pe-7s-rocket', component: League1 },
  { league2: true, path: '/league2', name: 'Next', icon: 'pe-7s-rocket', component: League2 },
  { redirect: true, path: '/', to: '/dashboard', name: 'Dashboard' }
]

const leagueRoutes = [
  { league: true, path: '/league1', name: 'Start New League', icon: 'pe-7s-rocket', component: League1 },
  { league2: true, path: '/league2', name: 'Next', icon: 'pe-7s-rocket', component: League2 }
]

export default appRoutes
