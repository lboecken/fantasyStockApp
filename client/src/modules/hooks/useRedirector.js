import { useNavigate } from 'react-router-dom';

export function useRedirector() {
  const navigate = useNavigate();
  return navigate;
}
