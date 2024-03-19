import Calculator from "./Calculator.js";
import LimitPlugins from "./LimitPlugins.js";
import LogPlugin from "./LogPlugins.js";

const calculator = new Calculator({
  plugins: [new LimitPlugins(), new LogPlugin()]
});
calculator.plus(10);
calculator.minus(5);
calculator.plus(1000)