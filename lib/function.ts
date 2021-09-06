export default function Comparator(prop: string) {
  return (a: { [x: string]: number }, b: { [x: string]: number }) => {
    if (a[prop] < b[prop]) {
      return 1;
    }
    if (a[prop] > b[prop]) {
      return -1;
    }
    return 0;
  };
}

// @ts-ignore
// data.sort(Comparator("BOND RETURN"));
