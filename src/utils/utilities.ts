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

export const getIphoneColor = (color: string): string => {
  const colorMap = new Map<string, string>([
    ['spacegray', '#535150'],
    ['midnightgreen', '#4E5851'],
    ['silver', '#EBEBE3'],
    ['rosegold', '#FAD7BD'],
    ['purple', '#D1CDDA'],
    ['yellow', '#FFE681'],
    ['green', '#AEE1CD'],
    ['black', '#1F2020'],
    ['white', '#F9F6EF'],
    ['red', '#BA0C2E'],
    ['coral', '#EE7762'],
    ['gold', '#F5DDC5'],
  ]);

  return colorMap.get(color) || 'pink';
};
