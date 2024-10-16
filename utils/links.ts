type NavLink = {
    href: string;
    label: string;
  };
  
  export const links: NavLink[] = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/trialsData', label: 'trialsData' },
    { href: '/newTrial', label: 'newTrial' },
  ];
  
  export const adminLinks: NavLink[] = [
    { href: '/admin/trialsData', label: 'trialsData' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/trials/create', label: 'create trial' },
  ];