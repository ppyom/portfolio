export const cn = (...classNames: (string | undefined | boolean)[]) => {
  return classNames.filter((c) => !!c).join(' ');
};
