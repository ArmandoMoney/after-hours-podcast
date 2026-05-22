import { useState } from 'react';
import CursorGlow from '../CursorGlow';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminLayout() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('ah_admin_auth') === 'true'
  );

  function handleSignOut() {
    sessionStorage.removeItem('ah_admin_auth');
    setAuthenticated(false);
  }

  return (
    <>
      <CursorGlow />
      <div className="h-full overflow-y-auto">
        {authenticated ? (
          <AdminDashboard onSignOut={handleSignOut} />
        ) : (
          <AdminLogin onAuth={() => setAuthenticated(true)} />
        )}
      </div>
    </>
  );
}
