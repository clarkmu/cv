export const validateNumericInput = (e) => {
  // input.number allows empty no value >_>
  let v = parseFloat(e.target.value);
  if (v === NaN) v = 0;
  return v;
};
