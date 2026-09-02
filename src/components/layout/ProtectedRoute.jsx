import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function ProtectedRoute({ children }) {
  const { role } = useUser();

  if (!role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
