export const getPhoneRoute = (phoneId: string) => {
  const routeParts = phoneId.split('-');
  if (routeParts.length > 5) {
    const name = routeParts.slice(0, routeParts.length - 2).join('-');
    const capacity = routeParts.at(-2);
    const color = routeParts.at(-1);

    return {
      id: name,
      capacity,
      color,
    };
  }
  const name = routeParts.slice(0, 3).join('-');
  const capacity = routeParts[3];
  const color = routeParts[4];

  return {
    id: name,
    capacity,
    color,
  };
};
