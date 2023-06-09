export const compareShallow = <T extends {}>(a: T, b: T): boolean => {
  return (
    Object.keys(a).length === Object.keys(b).length &&
    (Object.keys(a) as (keyof typeof a)[]).every((key) => {
      return Object.prototype.hasOwnProperty.call(b, key) && a[key] === b[key];
    })
  );
};

export const evenPartition = <T>(a: Array<T>, n: number): Array<Array<T>> => {
  let out = new Array<Array<T>>();
  let l = a.length;

  n = Math.floor(n);

  if (n === 0) {
    throw new RangeError("Cannot split an array into no parts");
  }

  if (n < 0) {
    throw new RangeError("Cannot split an array into negative parts");
  }

  if (n === 1) {
    return [a];
  }

  const s = Math.floor(l / n);

  if (s < 1) {
    a.forEach((v) => out.push([v]));
    return out;
  }

  if (s === 1) {
    return [
      a.slice(0, Math.floor(a.length / 2)),
      a.slice(Math.ceil(a.length / 2), a.length),
    ];
  }

  // balanced split is possible by default
  if (l % n === 0) {
    for (let i = 0; i < l; i += s) {
      out.push(a.slice(i, i + s));
    }
    return out;
  }

  // set up default minimum partition sizes
  let partition_sizes = [];
  for (let i = 0; i < n; i++) {
    partition_sizes.push(s);
  }

  // increase partition sizes starting from the front
  // based on the remaining elements to allocate
  let remaining = l - s * n;
  for (let i = 0; remaining > 0; i++) {
    partition_sizes[i]++;
    remaining--;
  }

  // take slices of a of each subsequent size calculated earlier
  let i = 0;
  while (i < l) {
    out.push(a.slice(i, i + partition_sizes[0]));
    i += partition_sizes[0];
    partition_sizes = partition_sizes.slice(1);
  }

  return out;
};

export function range(n: number, end: number | undefined = undefined) {
  return end === undefined
    ? Array.from({ length: n }, (v, k) => k)
    : Array.from({ length: end - n }, (v, k) => k + n);
}

export const shuffle = <T>(a: Array<T>) => {
  let out = [...a];
  for (let i = out.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i * 1));
    let t = out[i];
    out[i] = out[j];
    out[j] = t;
  }
  return out;
};
