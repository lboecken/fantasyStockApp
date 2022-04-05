import { useContextManager } from './useContextManager';
import { useRedirector } from './useRedirector';
import { useLoginManager } from './useLoginManager';

import { useState } from 'react';

function useBearerToken() {
  const [bearerToken, setBearerToken] = useState(undefined);
  return { bearerToken: bearerToken, setBearerToken: setBearerToken };
}

export { useContextManager, useRedirector, useLoginManager, useBearerToken };
