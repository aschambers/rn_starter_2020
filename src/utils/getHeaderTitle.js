export const getHeaderTitle = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Profile';

  switch (routeName) {
    case 'ProfileScreen':
      return 'Profile';
    case 'DashboardScreen':
      return 'Dashboard';
  }
}
