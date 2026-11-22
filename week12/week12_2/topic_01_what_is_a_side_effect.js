useEffect(() => {
  document.title = 'Web Programming Course';
}, []);

useEffect(() => {
  fetchUserProfile(userId);
}, [userId]);

useEffect(() => {
  console.log('Rendered at:', new Date());
});
