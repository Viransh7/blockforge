import { useMemo } from "react";

const paddedLength = 4;

export function LabeledValue(props: { value: number }) {
  const strValue = props.value.toString();

  const zeroesList = useMemo(() => {
    const zeroes = paddedLength - strValue.length;
    return zeroes > 0 ? [...Array(zeroes)].map((_el, index) => index) : null;
  }, [strValue]);

  return (
    <div className="text-4xl lg:text-6xl">
      {zeroesList?.map((index) => (
        <span className="opacity-50" key={index}>
          {0}
        </span>
      ))}
      {props.value}
    </div>
  );
}
