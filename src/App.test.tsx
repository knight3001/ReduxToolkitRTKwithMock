import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import App from "./App";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("renders manage posts title", () => {
  const { getByText } = render(<App />);

  expect(getByText("Manage Posts")).toBeInTheDocument();
});

test("use jest-dom", () => {
  document.body.innerHTML = `
    <span data-testid="not-empty"><span data-testid="empty"></span></span>
    <div data-testid="visible">Visible Example</div>
  `;

  expect(screen.queryByTestId("not-empty")).not.toBeEmptyDOMElement();
  expect(screen.getByText("Visible Example")).toBeVisible();
});

beforeAll(() => console.log("1 - beforeAll"));
afterAll(() => console.log("1 - afterAll"));
beforeEach(() => console.log("1 - beforeEach"));
afterEach(() => console.log("1 - afterEach"));
test("", () => console.log("1 - test"));
describe("Scoped / Nested block", () => {
  beforeAll(() => console.log("2 - beforeAll"));
  afterAll(() => console.log("2 - afterAll"));
  beforeEach(() => console.log("2 - beforeEach"));
  afterEach(() => console.log("2 - afterEach"));
  test("", () => console.log("2 - test"));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

test("renders manage posts title", () => {
  function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  }

  const mockCallback = jest.fn((x) => x + 42);
  forEach([0, 1], mockCallback);

  expect(mockCallback.mock.calls.length).toBe(2);

  expect(mockCallback.mock.calls[0][0]).toBe(0);

  expect(mockCallback.mock.calls[1][0]).toBe(1);

  expect(mockCallback.mock.results[0].value).toBe(42);
});

const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
