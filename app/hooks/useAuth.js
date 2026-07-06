// hooks/useAuth.js
'use client';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
const expiresAt = Date.now() + 2 * 1 * 1 * 1000; // 2 hours

localStorage.setItem("token", token);
localStorage.setItem("userId", user.id);
localStorage.setItem("user", JSON.stringify(user));
localStorage.setItem("expiresAt", expiresAt);
  // useEffect(() => {
  //   // Only run on client side after hydration
  //   const checkAuth = () => {
  //     try {
  //       const storedToken = localStorage.getItem('token');
  //       const storedUserId = localStorage.getItem('userId');
  //       const storedUser = localStorage.getItem('user');

  //       if (storedToken && storedUserId) {
  //         setToken(storedToken);
  //         setUserId(storedUserId);
  //         setIsAuthenticated(true);
  //         if (storedUser) {
  //           setUser(JSON.parse(storedUser));
  //         }
  //       }
  //     } catch (e) {
  //       console.error('Auth hook error:', e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);
useEffect(() => {
  const checkAuth = () => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');
      const storedUser = localStorage.getItem('user');
      const expiresAt = localStorage.getItem('expiresAt');

      
      if (expiresAt && Date.now() > Number(expiresAt)) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        localStorage.removeItem('expiresAt');

        setUser(null);
        setUserId(null);
        setToken(null);
        setIsAuthenticated(false);

        window.location.href = '/acountCreation';
        return;
      }

      // ✅ valid session
      if (storedToken && storedUserId) {
        setToken(storedToken);
        setUserId(storedUserId);
        setIsAuthenticated(true);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (e) {
      console.error('Auth hook error:', e);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
    }
    setUser(null);
    setUserId(null);
    setToken(null);
    setIsAuthenticated(false);
    window.location.href = '/acountCreation';
  };

  const authFetch = async (url, options = {}) => {
    const currentToken = typeof window !== 'undefined' ? localStorage.getItem('token') : token;
    
    if (!currentToken) throw new Error('Not authenticated');

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentToken}`,
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    
    if (response.status === 401) {
      logout();
      throw new Error('Session expired. Please login again.');
    }

    return response;
  };

  return { user, userId, token, isAuthenticated, loading, logout, authFetch };
};

export default useAuth;