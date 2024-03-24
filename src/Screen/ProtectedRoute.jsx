import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../Components/UI/Loading';

export default function ProtectedRoute({ children }) {
  const { loading, user } = useAuth();
  if (!loading) {
    if (!user) {
      return <Navigate to={'/'} />;
    }
    return children;
  }
  return <Loading />;
}
