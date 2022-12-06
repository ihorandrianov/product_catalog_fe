import { useSession, signIn, signOut } from 'next-auth/react';

const LogIn = () => {
  const { data: session } = useSession();
  const onSignIn = () => {
    signIn('github');
  };

  console.log(session);

  const onSignOut = () => {
    signOut();
  };

  return (
    <>
      <button onClick={onSignOut}> SignOut</button>
      <button onClick={onSignIn}>SIgnIn</button>
    </>
  );
};

export default LogIn;
